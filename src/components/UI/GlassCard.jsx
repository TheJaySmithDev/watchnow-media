import React from 'react';
import './GlassCard.css';

const GlassCard = ({ 
  children, 
  className = '', 
  onClick, 
  hover = true,
  size = 'medium',
  ...props 
}) => {
  const cardClasses = [
    'glass-card',
    hover ? 'glass-card-hover' : '',
    `glass-card-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;