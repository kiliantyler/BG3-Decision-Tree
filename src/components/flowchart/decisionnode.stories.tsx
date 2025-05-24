import { Intro } from '@/data/decisions/act1/nautiloid/intro'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { ReactFlowProvider } from 'reactflow'
import { DecisionNode } from './decisionnode'

const meta: Meta<typeof DecisionNode> = {
  component: DecisionNode,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <ReactFlowProvider>
        <div style={{ width: '400px', height: '500px', position: 'relative' }}>
          <Story />
        </div>
      </ReactFlowProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DecisionNode>

// Handlers for decision node events
const handleComplete = (
  id: string,
  option: any,
  wasAlreadyCompleted: boolean,
) => {
  console.log('Decision completed:', id, option, wasAlreadyCompleted)
}

const handleRemove = (id: string) => {
  console.log('Remove node:', id)
}

// Standard node props to avoid repetition
const nodeProps = {
  isConnectable: true,
  selected: false,
  dragging: false,
  xPos: 0,
  yPos: 0,
  zIndex: 0,
  dragHandle: '.drag-handle',
}

export const Default: Story = {
  render: () => (
    <DecisionNode
      id="node-1"
      type="decisionNode"
      data={{
        decision: Intro,
        onComplete: handleComplete,
        onRemove: handleRemove,
      }}
      {...nodeProps}
    />
  ),
}

export const Required: Story = {
  render: () => (
    <DecisionNode
      id="node-2"
      type="decisionNode"
      data={{
        decision: {
          ...Intro,
          required: true,
        },
        onComplete: handleComplete,
        onRemove: handleRemove,
      }}
      {...nodeProps}
    />
  ),
}

// Create a modified version of DecisionNode that shows as completed
export const Completed: Story = {
  render: () => {
    // Create a modified component within the render function
    const CompletedDecision = () => {
      return (
        <DecisionNode
          id="node-3"
          type="decisionNode"
          data={{
            decision: {
              ...Intro,
              description: 'Completed Decision',
            },
            onComplete: (id, selectedOption, wasCompleted) => {
              // Log the completion
              handleComplete(id, selectedOption, wasCompleted)
            },
            onRemove: handleRemove,
          }}
          {...nodeProps}
        />
      )
    }

    // Immediately select an option after mounting the component
    React.useEffect(() => {
      // Find the decision node in the DOM and programmatically select an option
      // This is a simpler approach than trying to handle it with refs
      const timer = setTimeout(() => {
        const option = document.querySelector('.option-box') as HTMLElement
        if (option) {
          // Using type assertion to tell TypeScript this is an HTMLElement
          option.click()
        }
      }, 10)

      return () => clearTimeout(timer)
    }, [])

    return <CompletedDecision />
  },
}
