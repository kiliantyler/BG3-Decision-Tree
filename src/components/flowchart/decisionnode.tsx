'use client'

import { cn } from '@/lib/utils'
import type { Decision, DecisionOption } from '@/types'
import { Badge } from '@ui/badge'
import { Card, CardContent, CardTitle } from '@ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/collapsible'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@ui/context-menu'
import { OptionBox } from '@ui/option-box'
import * as React from 'react'
import type { NodeProps } from 'reactflow'
import { Handle, Position } from 'reactflow'

export interface DecisionNodeData {
  decision: Decision
  onComplete?: (
    id: string,
    option: DecisionOption,
    wasAlreadyCompleted: boolean,
  ) => void
  onRemove?: (id: string) => void
}

export function DecisionNode({
  data,
  id,
  isConnectable,
}: NodeProps<DecisionNodeData>) {
  const { decision } = data
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  const [isChangingDecision, setIsChangingDecision] =
    React.useState<boolean>(false)
  const [chosenOption, setChosenOption] = React.useState<
    DecisionOption | undefined
  >(undefined)

  // Handle option selection
  const handleOptionSelect = (option: DecisionOption | undefined) => {
    // If changing a decision, handle confirmation first
    if (chosenOption && !isChangingDecision) {
      setIsChangingDecision(true)
      return
    }

    // Reset the changing state
    setIsChangingDecision(false)

    // Set the new option and close options panel
    setChosenOption(option)
    setIsOpen(false)

    // Call completion callback if provided
    if (data.onComplete && typeof data.onComplete === 'function') {
      data.onComplete(id, option!, chosenOption !== undefined)
    }
  }

  // Cancel decision change
  const handleCancelChange = () => {
    setIsChangingDecision(false)
  }

  // Handle node removal if optional
  const handleRemoveNode = () => {
    if (data.onRemove && typeof data.onRemove === 'function') {
      data.onRemove(id)
    }
  }

  // Render options list
  const renderedOptions = decision.options.map(
    (option: DecisionOption, index) => (
      <OptionBox
        key={index}
        onClick={() => handleOptionSelect(option)}
      >
        {option.text}
      </OptionBox>
    ),
  )

  // Handle click on selected option
  const handleSelectedOptionClick = () => {
    // Show change decision warning instead of just opening the panel
    setIsChangingDecision(true)
  }

  // Render selected option when collapsed
  const selectedOptionDisplay = !isOpen && chosenOption && (
    <div className={cn('flex', 'w-full', 'flex-col', 'space-y-2')}>
      <OptionBox
        variant={'default'}
        onClick={handleSelectedOptionClick}
        className="option-box border border-dashed border-green-500 dark:border-green-700"
      >
        {chosenOption.text}
      </OptionBox>
    </div>
  )

  // Show warning when changing a decision
  const decisionChangeWarning = isChangingDecision && (
    <div className="mb-3 rounded-md border border-amber-300 bg-amber-100 p-3 text-sm dark:border-amber-800 dark:bg-amber-950">
      <p className="mb-2 font-semibold">
        Warning: Changing this decision may remove connected nodes.
      </p>
      <div className="flex justify-between gap-2">
        <button
          onClick={handleCancelChange}
          className="rounded border border-input bg-secondary px-2 py-1 text-xs text-secondary-foreground"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setChosenOption(undefined)
            setIsChangingDecision(false)
            // Automatically open the options panel when user decides to change
            setIsOpen(true)
          }}
          className="rounded bg-destructive px-2 py-1 text-xs text-destructive-foreground"
        >
          Change Decision
        </button>
      </div>
    </div>
  )

  // Context menu items
  const contextMenuItems = (
    <>
      {chosenOption && (
        <ContextMenuItem onClick={() => setIsChangingDecision(true)}>
          Change Decision
        </ContextMenuItem>
      )}
      {decision.required !== true && (
        <ContextMenuItem
          onClick={handleRemoveNode}
          className="text-destructive"
        >
          Remove Node
        </ContextMenuItem>
      )}
    </>
  )

  // Determine status badge and border color
  const isRequired = decision.required === true
  const isCompleted = chosenOption !== undefined

  let badgeVariant = 'secondary'
  let badgeText = 'Optional'
  let borderColor = 'border-gray-300 dark:border-gray-600'

  if (isRequired) {
    badgeVariant = 'outline'
    badgeText = 'Required'
    borderColor = 'border-amber-400 dark:border-amber-700'
  }

  if (isCompleted) {
    badgeVariant = 'default'
    badgeText = 'Completed'
    borderColor = 'border-green-500 dark:border-green-800'
  }

  return (
    <>
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />

      <ContextMenu>
        <ContextMenuTrigger>
          <Card
            className={cn(
              'w-[350px]',
              'items-center',
              'hover:cursor-pointer',
              'border-2',
              borderColor,
              'shadow-md',
            )}
          >
            <CardTitle className="flex items-center justify-between gap-2 p-3 text-center">
              <span className="flex-1 truncate">{decision.description}</span>
              <Badge
                variant={badgeVariant as any}
                className="shrink-0"
              >
                {badgeText}
              </Badge>
            </CardTitle>

            <CardContent className="w-full p-3 pt-0">
              {/* Decision change warning */}
              {decisionChangeWarning}

              {/* Selected option when collapsed */}
              {selectedOptionDisplay}

              {/* Options collapsible */}
              <Collapsible
                open={isOpen}
                onOpenChange={value => !isChangingDecision && setIsOpen(value)}
              >
                <CollapsibleContent>
                  <div className={cn('flex w-full', 'flex-col', 'space-y-2')}>
                    {renderedOptions}
                  </div>
                </CollapsibleContent>

                {/* Show expand/collapse trigger button when options are hidden */}
                {!isOpen && !selectedOptionDisplay && (
                  <CollapsibleTrigger asChild>
                    <button className="mt-1 w-full text-xs text-muted-foreground">
                      Show options
                    </button>
                  </CollapsibleTrigger>
                )}
              </Collapsible>

              {/* Metadata section (prerequisites, unlocks) */}
              {(decision.prerequisites && decision.prerequisites.length > 0) ||
              (decision.unlocks && decision.unlocks.length > 0) ? (
                <div className="mt-3 border-t border-dashed border-muted pt-3 text-xs text-muted-foreground">
                  {decision.prerequisites &&
                    decision.prerequisites.length > 0 && (
                      <div className="mb-1">
                        <strong>Requires:</strong>{' '}
                        {decision.prerequisites
                          .map(p => p.description)
                          .join(', ')}
                      </div>
                    )}
                  {decision.unlocks && decision.unlocks.length > 0 && (
                    <div>
                      <strong>Unlocks:</strong>{' '}
                      {decision.unlocks.map(u => u.description).join(', ')}
                    </div>
                  )}
                </div>
              ) : null}

              {/* Change decision button when option selected and expanded */}
              {isOpen && chosenOption && !isChangingDecision && (
                <button
                  onClick={() => setIsChangingDecision(true)}
                  className="mt-3 w-full rounded border border-input bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                >
                  Change Decision
                </button>
              )}
            </CardContent>
          </Card>
        </ContextMenuTrigger>

        <ContextMenuContent>{contextMenuItems}</ContextMenuContent>
      </ContextMenu>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />
    </>
  )
}
