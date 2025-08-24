import React from 'react';
import '../../assets/styles/Common.css';

/**
 * Komponentii Input irra deddeebiin fayyadu.
 * Props hunda kan <input> fudhatu fudhata.
 */
const Input = ({ ...props }) => {
  return (
    <input className="form-control" {...props} />
  );
};

export default Input;