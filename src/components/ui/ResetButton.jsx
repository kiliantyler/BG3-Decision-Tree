// components/ui/ResetButton.jsx
import React from 'react';
import { ResetIcon } from '../icons';
import IconButton from './IconButton';

const ResetButton = ({ onClick }) => {
  return (
    <IconButton
      className="reset-button"
      onClick={onClick}
      title="Reset all decisions"
      ariaLabel="Reset all decisions"
    >
      <ResetIcon />
    </IconButton>
  );
};

export default ResetButton;
