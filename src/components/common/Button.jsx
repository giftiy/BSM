import React from 'react';
import '../../assets/styles/Common.css';

/**
 .
 * @param {object} props
 * @param {React.ReactNode} props.children 
 * @param {() => void} props.onClick 
 * @param {'primary' | 'secondary'} [props.variant='primary'] 
 * @param {boolean} [props.disabled=false] 
 */
const Button = ({ children, onClick, variant = 'primary', disabled = false, ...props }) => {
  const className = `btn btn-${variant}`;

  return (
    <button onClick={onClick} className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;