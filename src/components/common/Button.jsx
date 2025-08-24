import React from 'react';
import '../../assets/styles/Common.css';

/**
 * Komponentii Button irra deddeebiin fayyadu.
 * @param {object} props
 * @param {React.ReactNode} props.children - Waan button keessatti barreeffamu
 * @param {() => void} props.onClick - Function yoo tuqamu hojjetu
 * @param {'primary' | 'secondary'} [props.variant='primary'] - Akaakuu button
 * @param {boolean} [props.disabled=false] - Yoo hojiin ala ta'e
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