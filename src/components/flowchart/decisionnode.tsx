'use client'

import { Card, CardContent, CardTitle } from '@ui/card'
import * as React from 'react'
import { OptionBox } from '../ui/option-box'

export function DecisionNode() {
  const [isOpen, setIsOpen] = React.useState(true)

  if (isOpen) {
  }

  return (
    <Card className="hover:cursor-pointer max-w-md min-h-50 items-center">
      <CardTitle className="text-center">Hello</CardTitle>
      <CardContent>
        <p>Decision to make</p>
        <div className="w-[350px] space-y-2">
          <OptionBox>
            TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest
          </OptionBox>
          <OptionBox
            onClick={() => {
              console.log('Option 2 clicked')
            }}
          />
          <OptionBox
            title="Option 3"
            onClick={() => {
              console.log('Option 3 clicked')
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
