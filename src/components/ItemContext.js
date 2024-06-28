import React, { createContext, useState } from 'react';

export const ItemContext = createContext();
export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  return (
    <ItemContext.Provider value={[ items, setItems ]}>
      {children}
    </ItemContext.Provider>
  );
};
