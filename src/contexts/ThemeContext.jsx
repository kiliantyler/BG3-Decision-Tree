import { createContext, useContext, useEffect, useState } from 'react';

// Create the theme context
const ThemeContext = createContext(null);

// Dracula Pro color palette
export const themes = {
  light: {
    name: 'light',
    background: '#ffffff',
    currentLine: '#f8f8f8',
    selection: '#e0e0e0',
    foreground: '#213547',
    comment: '#6c757d',
    cyan: '#0dcaf0',
    green: '#198754',
    orange: '#fd7e14',
    pink: '#d63384',
    purple: '#6f42c1',
    red: '#dc3545',
    yellow: '#ffc107',
    border: '#ddd',
    nodeBackground: '#ffffff',
    sidebarBackground: '#f8f8f8',
    requiredNode: '#ffb84d',
    requiredBorder: '#ff9900',
    optionalNode: '#e0e0e0',
    optionalBorder: '#bebebe',
    completedNode: '#d4edda',
    completedBorder: '#c3e6cb',
  },
  dark: {
    name: 'dark',
    background: '#22212C',
    currentLine: '#44475A',
    selection: '#454158',
    foreground: '#F8F8F2',
    comment: '#7970A9',
    cyan: '#80FFEA',
    green: '#8AFF80',
    orange: '#FFCA80',
    pink: '#FF80BF',
    purple: '#9580FF',
    red: '#FF9580',
    yellow: '#FFFF80',
    border: '#44475A',
    nodeBackground: '#282A36',
    sidebarBackground: '#282A36',
    requiredNode: '#BD93F9',
    requiredBorder: '#9580FF',
    optionalNode: '#44475A',
    optionalBorder: '#6272A4',
    completedNode: '#50FA7B',
    completedBorder: '#8AFF80',
  },
};

/**
 * Provider component for theme management
 */
export const ThemeProvider = ({ children }) => {
  // Check if user has a saved theme preference
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  };

  // State for current theme
  const [theme, setTheme] = useState(getSavedTheme());

  // Apply theme to document root and save to localStorage when changed
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Apply theme colors to CSS variables
    const currentTheme = themes[theme];
    Object.entries(currentTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default ThemeContext;
