import React, { createContext, useState } from 'react';

export const PlaceContext = createContext();
export const PlaceProvider = ({ children }) => {
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');

  return (
    <PlaceContext.Provider value={{ placeOfSupply, placeOfDelivery,setPlaceOfSupply, setPlaceOfDelivery }}>
      {children}
    </PlaceContext.Provider>
  );
};
