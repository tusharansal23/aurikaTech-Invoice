import React, { createContext, useState } from 'react';

export const LogoImageContext = createContext();

export const LogoImageProvider = ({ children }) => {
  const [logoSelectedImage, setLogoSelectedImage] = useState(null);

  return (
    <LogoImageContext.Provider value={{ logoSelectedImage, setLogoSelectedImage }}>
      {children}
    </LogoImageContext.Provider>
  );
};
