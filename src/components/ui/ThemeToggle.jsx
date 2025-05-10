// components/ui/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MoonIcon, SunIcon } from '../icons';
import IconButton from './IconButton';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      className="theme-toggle"
      onClick={toggleTheme}
      ariaLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title="Theme Toggle"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
