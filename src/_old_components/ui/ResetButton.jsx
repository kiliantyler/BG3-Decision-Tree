// components/ui/ResetButton.jsx
import React, { useRef, useState } from 'react';
import { ResetIcon } from '../icons';
import IconButton from './IconButton';
import Modal from './Modal';

const ResetButton = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    if (onClick) {
      onClick();
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton
        ref={buttonRef}
        position="bottom-left"
        onClick={handleButtonClick}
        title="Reset all decisions"
        ariaLabel="Reset all decisions"
        borderColor="var(--red)"
        darkModeBorderColor="var(--border)"
        hoverBorderColor="var(--red)"
      >
        <ResetIcon />
      </IconButton>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Reset Decisions"
        message="Are you sure you want to reset all progress? This cannot be undone."
        confirmText="Reset"
        cancelText="Cancel"
        buttonRef={buttonRef}
      />
    </>
  );
};

export default ResetButton;
