// components/ui/ResetButton.jsx
import React from 'react';
import { ResetIcon } from '../icons';
import IconButton from './IconButton';

const ResetButton = ({ onClick }) => {
  return (
    <IconButton
      position="bottom-left"
      onClick={onClick}
      title="Reset all decisions"
      ariaLabel="Reset all decisions"
      borderColor="var(--red)"
      darkModeBorderColor="var(--border)"
      hoverBorderColor="var(--red)"
    >
      <ResetIcon />
    </IconButton>
  );
};

export default ResetButton;
