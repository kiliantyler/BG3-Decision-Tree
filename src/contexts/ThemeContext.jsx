import { createContext, useEffect, useState } from 'react';
import { themes } from '../styles/themes/dracula';

// Create the theme context
const ThemeContext = createContext(null);

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

export default ThemeContext;
