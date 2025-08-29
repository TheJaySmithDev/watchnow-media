import React from 'react';
import './GlassButton.css';

const GlassButton = ({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  ...props 
}) => {
  const buttonClasses = [
    'glass-button',
    `glass-button-${variant}`,
    `glass-button-${size}`,
    disabled ? 'glass-button-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;