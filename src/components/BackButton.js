// src/BackButton.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current location is not the first page
  const showBackButton = location.pathname !== '/';

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return showBackButton ? (
    <button className='back-button' onClick={handleBack}>Back</button>
  ) : null;
};

export default BackButton;
