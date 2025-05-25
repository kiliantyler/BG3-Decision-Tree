import type { Decision } from '@/types'
import { DecisionType } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import {
  getCompletedDecisionsForDemo,
  isDecisionUnavailable,
} from './decision-status'

// Create a demo component to showcase the functions
const DecisionStatusDemo = () => {
  const completedDecisions = getCompletedDecisionsForDemo()

  // Example decisions with different statuses
  const availableDecision: Decision = {
    id: 'available_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    type: DecisionType.DECISION,
    description: 'A regular decision with no prerequisites',
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
  }

  const prerequisiteDecision: Decision = {
    id: 'prereq_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    type: DecisionType.DECISION,
    description: 'Decision with prerequisites',
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    prerequisites: [completedDecisions[0]],
  }

  const mutuallyExclusiveDecision: Decision = {
    id: 'mutually_exclusive_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    type: DecisionType.DECISION,
    description: 'Decision that conflicts with a completed decision',
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    mutuallyExclusive: [completedDecisions[1]],
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-bold">Decision Status Helper Demo</h2>

      <div className="space-y-2">
        <h3 className="text-md font-semibold">Completed Decisions:</h3>
        <ul className="list-disc pl-5">
          {completedDecisions.map(decision => (
            <li key={decision.id}>
              {decision.id} - {decision.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-md font-semibold">Test Decisions:</h3>

        <div className="rounded border p-3">
          <p>
            <strong>Regular Decision:</strong> {availableDecision.description}
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(availableDecision, completedDecisions)
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                availableDecision,
                completedDecisions,
              ).toString()}
            </span>
          </p>
        </div>

        <div className="rounded border p-3">
          <p>
            <strong>Decision with Prerequisites:</strong>{' '}
            {prerequisiteDecision.description}
          </p>
          <p className="text-sm">
            Has prerequisite: {prerequisiteDecision.prerequisites?.[0]?.id}
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(prerequisiteDecision, completedDecisions)
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                prerequisiteDecision,
                completedDecisions,
              ).toString()}
            </span>
          </p>
        </div>

        <div className="rounded border p-3">
          <p>
            <strong>Mutually Exclusive Decision:</strong>{' '}
            {mutuallyExclusiveDecision.description}
          </p>
          <p className="text-sm">
            Mutually exclusive with:{' '}
            {mutuallyExclusiveDecision.mutuallyExclusive?.[0]?.id}
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(
                  mutuallyExclusiveDecision,
                  completedDecisions,
                )
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                mutuallyExclusiveDecision,
                completedDecisions,
              ).toString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof DecisionStatusDemo> = {
  title: 'Sidebar/Helpers/DecisionStatus',
  component: DecisionStatusDemo,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof DecisionStatusDemo>

export const DefaultDemo: Story = {}
