// components/layout/App.jsx
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import '../../styles/customStyles.css';
import '../../styles/theme.css';

// Components

// Context

const App = () => {
  return (
    <ReactFlowProvider>
      {/* <ThemeProvider>
        <DecisionProvider>
          <AppContent />
        </DecisionProvider>
      </ThemeProvider> */}
    </ReactFlowProvider>
  );
};

export default App;
