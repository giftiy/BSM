// /src/components/common/ThemeToggle.jsx

import React from 'react';
// This assumes your useTheme hook is in this file. Adjust if necessary.
import { useTheme } from '../../context/ThemeContext.jsx'; 

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Basic inline styles for simplicity
  const toggleStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme === 'light' ? '#ccc' : '#333',
    borderRadius: '34px',
    transition: '0.4s',
  };

  const nubStyle = {
    position: 'absolute',
    content: '""',
    height: '26px',
    width: '26px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: '0.4s',
    transform: theme === 'light' ? 'translateX(26px)' : 'translateX(0)',
  };

  return (
    <div className="theme-toggle-container">
      <label style={toggleStyle}>
        <input
          type="checkbox"
          style={{ opacity: 0, width: 0, height: 0 }}
          onChange={toggleTheme}
          checked={theme === 'light'}
        />
        <span style={sliderStyle}>
          <span style={nubStyle}></span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;