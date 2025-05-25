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

  // Create a new decision that is not in the completed list
  const uncompleted: Decision = {
    id: 'uncompleted_prerequisite',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    type: DecisionType.DECISION,
    description: 'This decision has not been completed yet',
    options: [{ text: 'Option A' }, { text: 'Option B' }],
  }

  // This decision has a prerequisite that is in the completed list
  const prerequisiteMetDecision: Decision = {
    id: 'prereq_met_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    type: DecisionType.DECISION,
    description: 'Decision with prerequisites that are satisfied',
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    prerequisites: [completedDecisions[0]], // GoblinCamp is completed
  }

  // This decision has a prerequisite that is NOT in the completed list
  const prerequisiteNotMetDecision: Decision = {
    id: 'prereq_not_met_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    type: DecisionType.DECISION,
    description: 'Decision with prerequisites that are NOT satisfied',
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    prerequisites: [uncompleted], // This is not in the completed list
  }

  const mutuallyExclusiveDecision: Decision = {
    id: 'mutually_exclusive_decision',
    act: { id: 'act1', name: 'Act 1', regions: [] },
    type: DecisionType.DECISION,
    description: 'Decision that conflicts with a completed decision',
    options: [{ text: 'Option 1' }, { text: 'Option 2' }],
    mutuallyExclusive: [completedDecisions[1]], // OwlbearCub is completed
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
            <strong>Decision with Satisfied Prerequisites:</strong>{' '}
            {prerequisiteMetDecision.description}
          </p>
          <p className="text-sm">
            Has prerequisite: {prerequisiteMetDecision.prerequisites?.[0]?.id}{' '}
            (Completed: ✓)
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(
                  prerequisiteMetDecision,
                  completedDecisions,
                )
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                prerequisiteMetDecision,
                completedDecisions,
              ).toString()}
            </span>
          </p>
        </div>

        <div className="rounded border bg-amber-50 p-3 dark:bg-amber-950/30">
          <p>
            <strong>Decision with Unsatisfied Prerequisites:</strong>{' '}
            {prerequisiteNotMetDecision.description}
          </p>
          <p className="text-sm">
            Has prerequisite:{' '}
            {prerequisiteNotMetDecision.prerequisites?.[0]?.id} (Completed: ✗)
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(
                  prerequisiteNotMetDecision,
                  completedDecisions,
                )
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                prerequisiteNotMetDecision,
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
            {mutuallyExclusiveDecision.mutuallyExclusive?.[0]?.id} (Completed:
            ✓)
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
