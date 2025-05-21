'use client'

import type { Decision, DecisionOption } from '@/types'
import { Card, CardContent, CardTitle } from '@ui/card'
import * as React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { OptionBox } from '../ui/option-box'

export function DecisionNode({ decision }: { decision: Decision }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [chosenOption, setChosenOption] = React.useState<DecisionOption | undefined>(undefined)

  const handleClick = (option: DecisionOption) => {
    setChosenOption(option)
    setIsOpen(!isOpen)
  }

  const renderedOptions = decision.options.map((option: DecisionOption, index) => (
    <OptionBox key={index} onClick={() => handleClick(option)}>
      {option.text}
    </OptionBox>
  ))

  let openBox = (
    <CollapsibleTrigger className="w-full">
      <div className="w-[350px] flex flex-col space-y-2">
        {chosenOption && <OptionBox>{chosenOption.text}</OptionBox>}
      </div>
    </CollapsibleTrigger>
  )

  if (isOpen) {
    openBox = <></>
  }

  return (
    <Card className="hover:cursor-pointer max-w-sm items-center">
      <CardTitle className="text-center">{decision.description}</CardTitle>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {openBox}
          <CollapsibleContent>
            <div className="w-[350px] flex flex-col space-y-2">{renderedOptions}</div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
