import { cn } from '@/lib/utils'
import type { Character } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Card, CardContent, CardTitle } from '@ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@ui/context-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip'
import * as React from 'react'
import type { NodeProps } from 'reactflow'
import { Handle, Position } from 'reactflow'

export interface CharacterSelectionNodeData {
  title: string
  characters: Character[]
  onSelect?: (characterId: string) => void
  selectedCharacter?: Character
}

export function CharacterSelectionNode({
  data,
  id,
  isConnectable,
}: NodeProps<CharacterSelectionNodeData>) {
  const { title, characters, onSelect, selectedCharacter } = data
  const [selected, setSelected] = React.useState<Character | undefined>(
    selectedCharacter,
  )
  const [isChanging, setIsChanging] = React.useState<boolean>(false)

  // Get character filename (lowercase)
  const getCharacterImagePath = (character: Character) => {
    const characterId = character.id.toLowerCase()
    return `/characters/${characterId}.png`
  }

  // Handle character selection
  const handleCharacterSelect = (character: Character) => {
    // If already selected and not in change mode, enter change mode
    if (selected && selected.id === character.id && !isChanging) {
      setIsChanging(true)
      return
    }

    // Reset change mode
    setIsChanging(false)

    // Select character
    setSelected(character)

    // Call onSelect callback if provided
    if (onSelect) {
      onSelect(character.id)
    }
  }

  // Handle cancel change
  const handleCancelChange = () => {
    setIsChanging(false)
  }

  // Show warning when changing character selection
  const characterChangeWarning = isChanging && (
    <div className="mb-3 rounded-md border border-amber-300 bg-amber-100 p-3 text-sm dark:border-amber-800 dark:bg-amber-950">
      <p className="mb-2 font-semibold">
        Warning: Changing your character may reset connected decisions.
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
            setSelected(undefined)
            setIsChanging(false)
          }}
          className="rounded bg-destructive px-2 py-1 text-xs text-destructive-foreground"
        >
          Change Character
        </button>
      </div>
    </div>
  )

  // Context menu items
  const contextMenuItems = (
    <>
      {selected && (
        <ContextMenuItem onClick={() => setIsChanging(true)}>
          Change Character
        </ContextMenuItem>
      )}
    </>
  )

  // Determine border color
  const borderColor = selected
    ? 'border-primary dark:border-primary'
    : 'border-gray-300 dark:border-gray-600'

  return (
    <>
      {/* Output handle (only on bottom for character selection) */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555', width: 8, height: 8 }}
        isConnectable={isConnectable}
      />

      <ContextMenu>
        <ContextMenuTrigger>
          <Card
            className={cn(
              'w-[500px]',
              'items-center',
              'hover:cursor-pointer',
              'border-2',
              borderColor,
              'shadow-md',
            )}
          >
            <CardTitle className="flex items-center justify-between gap-2 bg-muted/50 p-3 text-center">
              <span className="flex-1 text-center">
                {title || 'Select Your Character'}
              </span>
            </CardTitle>

            <CardContent className="w-full p-4">
              {/* Character change warning (separate screen) */}
              {isChanging && (
                <div className="flex flex-col space-y-4">
                  <div className="rounded-md border border-amber-300 bg-amber-100 p-4 text-center dark:border-amber-800 dark:bg-amber-950">
                    <div className="mb-6 text-center">
                      <h3 className="mb-2 text-lg font-semibold">
                        Change Character?
                      </h3>
                      <p className="mb-4 text-sm">
                        Changing your character will reset connected decisions.
                        Are you sure you want to proceed?
                      </p>

                      <div className="mt-6 flex justify-center gap-4">
                        <button
                          onClick={handleCancelChange}
                          className="rounded-md border border-input bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setSelected(undefined)
                            setIsChanging(false)
                          }}
                          className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
                        >
                          Change Character
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* If a character is selected, show it prominently */}
              {selected && !isChanging && (
                <div className="mb-4 flex flex-col items-center justify-center space-y-2 rounded-md border border-primary/50 bg-primary/5 p-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={getCharacterImagePath(selected)}
                      alt={selected.name}
                    />
                    <AvatarFallback>
                      {selected.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-medium">{selected.name}</h3>
                    {selected.description && (
                      <p className="text-sm text-muted-foreground">
                        {selected.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsChanging(true)}
                    className="mt-2 rounded-md border border-input px-3 py-1 text-xs hover:bg-accent"
                  >
                    Select Different Character
                  </button>
                </div>
              )}

              {/* Character selection grid */}
              {!selected && !isChanging && (
                <div className="grid grid-cols-4 gap-4">
                  <TooltipProvider>
                    {characters.map(character => (
                      <Tooltip key={character.id}>
                        <TooltipTrigger asChild>
                          <button
                            className={cn(
                              'flex h-24 w-full flex-col items-center justify-center rounded-md border p-2',
                              'transition-all hover:border-primary hover:bg-muted',
                              'border-gray-200 dark:border-gray-700',
                            )}
                            onClick={() => handleCharacterSelect(character)}
                          >
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={getCharacterImagePath(character)}
                                alt={character.name}
                              />
                              <AvatarFallback>
                                {character.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="mt-1 text-xs font-medium">
                              {character.name}
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{character.description || character.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              )}

              {/* Footer text */}
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Select your origin character to begin your journey
              </div>
            </CardContent>
          </Card>
        </ContextMenuTrigger>

        <ContextMenuContent>{contextMenuItems}</ContextMenuContent>
      </ContextMenu>
    </>
  )
}
