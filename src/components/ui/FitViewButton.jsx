// components/ui/FitViewButton.jsx
import React from 'react';
import { SearchIcon } from '../icons';
import IconButton from './IconButton';

const FitViewButton = ({ onClick }) => {
  return (
    <IconButton
      position="fit-view"
      onClick={onClick}
      title="View all nodes"
      ariaLabel="View all nodes"
      hoverBorderColor="var(--purple)"
    >
      <SearchIcon />
    </IconButton>
  );
};

export default FitViewButton;
