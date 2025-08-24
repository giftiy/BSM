import React from 'react';
import '../../assets/styles/Common.css';


const Input = ({ ...props }) => {
  return (
    <input className="form-control" {...props} />
  );
};

export default Input;