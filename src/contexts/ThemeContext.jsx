import { createContext, useEffect, useState } from 'react';
import { themes } from '../styles/themes/colorThemes';

// Create the theme context
const ThemeContext = createContext(null);

/**
 * Provider component for theme management optimized for Astro
 */
export const ThemeProvider = ({ children }) => {
  // Default theme for SSR to prevent hydration mismatches
  const [theme, setTheme] = useState('light');

  // Client-side theme initialization and management
  useEffect(() => {
    // Get saved theme or detect system preference
    const initializeTheme = () => {
      // Check for saved preference in localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark' ? 'dark' : 'light';
      }

      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Set the initial theme
    setTheme(initializeTheme());

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = e => {
      // Only update if there's no saved preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Modern browsers all support addEventListener
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    // Set data-theme attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Apply theme colors to CSS variables
    const currentTheme = themes[theme];
    Object.entries(currentTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

    // Force a repaint to ensure all styles are applied properly
    // Using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      document.body.style.display = 'none';
      // Trigger reflow
      void document.body.offsetHeight;
      document.body.style.display = '';
    });
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
