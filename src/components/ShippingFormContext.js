// InvoiceFormContext.js
import React, { createContext, useState } from 'react';

export const ShippingFormContext = createContext();

export const ShippingFormProvider = ({ children }) => {
    const [shippingFormData, setShippingFormData] = useState({});

    return (
        <ShippingFormContext.Provider value={{ shippingFormData, setShippingFormData }}>
            {children}
        </ShippingFormContext.Provider>
    );
};
