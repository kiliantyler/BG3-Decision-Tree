import type { Decision, DecisionDependency } from '@/types'
import type { Meta, StoryObj } from '@storybook/react'
import { isDecisionUnavailable } from './decision-status'

// Create sample completed decisions for this story file
const createStoryCompletedDecisions = (): Decision<any>[] => {
  // Create sample completed decisions
  const goblinCampDecision: Decision<any> = {
    id: 'wilderness_goblincamp_goblinleader',
    name: 'Goblin Leader Decision',
    description: 'What to do with the goblin leader',
    options: [
      { name: 'Kill the goblin leader' },
      { name: 'Spare the goblin leader' },
    ],
    dependencies: [],
  }

  const owlbearCubDecision: Decision<any> = {
    id: 'wilderness_forest_owlbearcub',
    name: 'Owlbear Cub Decision',
    description: 'What to do with the owlbear cub',
    options: [
      { name: 'Take the owlbear cub' },
      { name: 'Leave the owlbear cub' },
    ],
    dependencies: [],
  }

  return [
    goblinCampDecision,
    owlbearCubDecision,
  ]
}

// Create a demo component to showcase the functions
const DecisionStatusDemo = () => {
  const completedDecisions = createStoryCompletedDecisions()

  // Create a new decision that is not in the completed list
  const uncompleted: Decision<any> = {
    id: 'uncompleted_prerequisite',
    name: 'Not Completed Decision',
    description: 'This decision has not been completed yet',
    options: [
      { name: 'Option A' },
      { name: 'Option B' },
    ],
    dependencies: [],
  }

  // Example decisions with different statuses
  const availableDecision: Decision<any> = {
    id: 'available_decision',
    name: 'Available Decision',
    description: 'A regular decision with no dependencies',
    options: [
      { name: 'Option 1' },
      { name: 'Option 2' },
    ],
    dependencies: [],
  }

  // This decision has a dependency that requires a decision in the completed list
  const requiresMetDecision: Decision<any> = {
    id: 'requires_met_decision',
    name: 'Requires Met Decision',
    description: 'Decision with requires dependency that is satisfied',
    options: [
      { name: 'Option 1' },
      { name: 'Option 2' },
    ],
    dependencies: [
      {
        decision: completedDecisions[0], // GoblinCamp is completed
        option: { name: 'Option 1' },
        type: 'requires',
      } as DecisionDependency,
    ],
  }

  // This decision has a dependency that requires a decision NOT in the completed list
  const requiresNotMetDecision: Decision<any> = {
    id: 'requires_not_met_decision',
    name: 'Requires Not Met Decision',
    description: 'Decision with requires dependency that is NOT satisfied',
    options: [
      { name: 'Option 1' },
      { name: 'Option 2' },
    ],
    dependencies: [
      {
        decision: uncompleted, // This is not in the completed list
        option: { name: 'Option A' },
        type: 'requires',
      } as DecisionDependency,
    ],
  }

  // This decision has a dependency that excludes a decision in the completed list
  const excludesDecision: Decision<any> = {
    id: 'excludes_decision',
    name: 'Excludes Decision',
    description: 'Decision that conflicts with a completed decision',
    options: [
      { name: 'Option 1' },
      { name: 'Option 2' },
    ],
    dependencies: [
      {
        decision: completedDecisions[1], // OwlbearCub is completed
        option: { name: 'Take the owlbear cub' },
        type: 'excludes',
      } as DecisionDependency,
    ],
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
            <strong>Decision with Satisfied 'Requires' Dependency:</strong>{' '}
            {requiresMetDecision.description}
          </p>
          <p className="text-sm">
            Requires:{' '}
            {(requiresMetDecision.dependencies[0].decision as Decision<any>).id}{' '}
            (Completed: ✓)
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(requiresMetDecision, completedDecisions)
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                requiresMetDecision,
                completedDecisions,
              ).toString()}
            </span>
          </p>
        </div>

        <div className="rounded border bg-amber-50 p-3 dark:bg-amber-950/30">
          <p>
            <strong>Decision with Unsatisfied 'Requires' Dependency:</strong>{' '}
            {requiresNotMetDecision.description}
          </p>
          <p className="text-sm">
            Requires:{' '}
            {
              (requiresNotMetDecision.dependencies[0].decision as Decision<any>)
                .id
            }{' '}
            (Completed: ✗)
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(
                  requiresNotMetDecision,
                  completedDecisions,
                )
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                requiresNotMetDecision,
                completedDecisions,
              ).toString()}
            </span>
          </p>
        </div>

        <div className="rounded border p-3">
          <p>
            <strong>Decision with 'Excludes' Dependency:</strong>{' '}
            {excludesDecision.description}
          </p>
          <p className="text-sm">
            Excludes:{' '}
            {(excludesDecision.dependencies[0].decision as Decision<any>).id}{' '}
            (Completed: ✓)
          </p>
          <p className="text-sm">
            Is Unavailable:{' '}
            <span
              className={
                isDecisionUnavailable(excludesDecision, completedDecisions)
                  ? 'text-red-500'
                  : 'text-green-500'
              }
            >
              {isDecisionUnavailable(
                excludesDecision,
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
