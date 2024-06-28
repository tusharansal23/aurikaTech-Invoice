// InvoiceFormContext.js
import React, { createContext, useState } from 'react';

export const ReverseChargeContext = createContext();

export const ReverseChargeProvider = ({ children }) => {
    const [reverseCharge, setReverseCharge] = useState({});

    return (
        <ReverseChargeContext.Provider value={{ reverseCharge, setReverseCharge }}>
            {children}
        </ReverseChargeContext.Provider>
    );
};
