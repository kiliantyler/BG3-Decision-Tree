// components/layout/App.jsx
import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import '../../styles/customStyles.css';
import '../../styles/theme.css';

// Components
import AppContent from './AppContent';

// Context
import { DecisionProvider } from '../../contexts/DecisionContext';
import { ThemeProvider } from '../../contexts/ThemeContext';

const App = () => {
  return (
    <ReactFlowProvider>
      <ThemeProvider>
        <DecisionProvider>
          <AppContent />
        </DecisionProvider>
      </ThemeProvider>
    </ReactFlowProvider>
  );
};

export default App;
