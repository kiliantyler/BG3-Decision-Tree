// components/ui/Modal.jsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * A reusable modal component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {Function} props.onConfirm - Function to call when the confirm button is clicked
 * @param {string} props.title - Modal title
 * @param {string} props.message - Modal message
 * @param {string} props.confirmText - Text for the confirm button
 * @param {string} props.cancelText - Text for the cancel button
 * @param {React.RefObject} props.buttonRef - Reference to the button that triggered the modal
 * @returns {React.ReactElement} - The modal component
 */
const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  buttonRef,
}) => {
  const { theme } = useTheme();
  const modalRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Calculate position based on button reference
  useEffect(() => {
    if (isOpen && buttonRef?.current && modalRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

      // Position the modal above the button
      let top = buttonRect.top - modalRect.height - 10;
      let left = buttonRect.left - modalRect.width / 2 + buttonRect.width / 2;

      // Ensure the modal stays within viewport bounds
      if (top < 10) top = buttonRect.bottom + 10; // Position below if not enough space above
      if (left < 10) left = 10;
      if (left + modalRect.width > window.innerWidth - 10) {
        left = window.innerWidth - modalRect.width - 10;
      }

      modalRef.current.style.top = `${top}px`;
      modalRef.current.style.left = `${left}px`;
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className="modal-container"
        style={{
          position: 'fixed',
          backgroundColor: theme === 'dark' ? 'var(--currentLine)' : 'var(--nodeBackground)',
          color: theme === 'dark' ? 'var(--foreground)' : 'var(--foreground)',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: `0 4px 12px var(--boxShadowDarker)`,
          zIndex: 1000,
          minWidth: '250px',
          maxWidth: '350px',
          border: `1px solid var(--border)`,
        }}
      >
        <div className="modal-header">
          <h3 style={{ color: 'var(--red)' }}>{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--buttonBackground)',
              color: 'var(--buttonText)',
              border: `1px solid var(--buttonBorder)`,
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--red)',
              color: 'var(--badgeText)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
