import { createContext, useContext } from 'react'
import useDecisionManager from '../_old_hooks/useDecisionManager'

// Create the context
const DecisionContext = createContext(null)

/**
 * Provider component for decision management
 */
export const DecisionProvider = ({ children }) => {
  // Use the decision manager hook
  const decisionManager = useDecisionManager()

  return <DecisionContext.Provider value={decisionManager}>{children}</DecisionContext.Provider>
}

/**
 * Custom hook to use decision context
 */
export const useDecision = () => {
  const context = useContext(DecisionContext)

  if (!context) {
    throw new Error('useDecision must be used within a DecisionProvider')
  }

  return context
}

export default DecisionContext
