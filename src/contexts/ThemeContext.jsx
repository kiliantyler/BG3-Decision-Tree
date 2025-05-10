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
  // Check if user has a saved theme preference or use system preference
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');

    // If there's a saved theme preference, use it
    if (savedTheme) {
      return savedTheme === 'dark' ? 'dark' : 'light';
    }

    // Otherwise, detect user's device preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  };

  // State for current theme
  const [theme, setTheme] = useState(getSavedTheme());

  // Listen for changes in system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Define the handler function
    const handleChange = e => {
      // Only update if there's no saved preference in localStorage
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Apply theme to document root and save to localStorage when changed
  useEffect(() => {
    // Set data-theme attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Apply theme colors to CSS variables
    const currentTheme = themes[theme];
    Object.entries(currentTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

    // Add a small delay to ensure all styles are applied properly
    setTimeout(() => {
      // Force a repaint to ensure all styles are applied
      document.body.style.display = 'none';
      // This triggers a reflow
      void document.body.offsetHeight;
      document.body.style.display = '';
    }, 10);
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
