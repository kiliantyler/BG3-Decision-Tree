'use client'

import { cn } from '@/lib/utils'
import type { Decision, DecisionOption } from '@/types'
import { Card, CardContent, CardTitle } from '@ui/card'
import { Collapsible, CollapsibleContent } from '@ui/collapsible'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@ui/context-menu'
import { OptionBox } from '@ui/option-box'
import * as React from 'react'

export function DecisionNode({ decision }: { decision: Decision }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [chosenOption, setChosenOption] = React.useState<
    DecisionOption | undefined
  >(undefined)

  const handleClick = (option: DecisionOption | undefined) => {
    setChosenOption(option)
    setIsOpen(!isOpen)
  }

  const renderedOptions = decision.options.map(
    (option: DecisionOption, index) => (
      <OptionBox
        key={index}
        onClick={() => handleClick(option)}
      >
        {option.text}
      </OptionBox>
    ),
  )

  let openBox = (
    <div className={cn('flex', 'w-[350px]', 'flex-col', 'space-y-2')}>
      {chosenOption && (
        <OptionBox
          variant={'destructive'}
          onClick={() => handleClick(undefined)}
        >
          {chosenOption.text}
        </OptionBox>
      )}
    </div>
  )

  if (isOpen) {
    openBox = <></>
  }

  const contextMenu = chosenOption ? (
    <ContextMenuItem onClick={() => handleClick(undefined)}>
      Undo Decision
    </ContextMenuItem>
  ) : (
    <></>
  )

  // TODO: Better border for an active decision
  const borderColor = chosenOption ? 'border-chart-2' : 'border-ring'

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className={cn(
            'max-w-sm',
            'items-center',
            'hover:cursor-pointer',
            borderColor,
          )}
        >
          <CardTitle className="text-center">{decision.description}</CardTitle>
          <CardContent>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              {openBox}
              <CollapsibleContent>
                <div className={cn('flex w-[350px]', 'flex-col', 'space-y-2')}>
                  {renderedOptions}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {contextMenu}
        <ContextMenuItem className={cn('text-destructive')}>
          Delete node
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
