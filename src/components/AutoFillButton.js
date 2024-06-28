// src/AutoFillButton.js

import React from 'react';

const AutoFillButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="auto-fill-button">
      Auto Fill
    </button>
  );
};

export default AutoFillButton;
