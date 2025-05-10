// components/ui/FitViewButton.jsx
import React from 'react';
import { SearchIcon } from '../icons';
import IconButton from './IconButton';

const FitViewButton = ({ onClick }) => {
  return (
    <IconButton
      className="fit-view-button"
      onClick={onClick}
      title="View all nodes"
      ariaLabel="View all nodes"
    >
      <SearchIcon />
    </IconButton>
  );
};

export default FitViewButton;
