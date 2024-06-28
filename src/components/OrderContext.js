// InvoiceFormContext.js
import React, { createContext, useState } from 'react';

export const OrderFormContext = createContext();

export const OrderFormProvider = ({ children }) => {
    const [orderFormData, setOrderFormData] = useState({});

    return (
        <OrderFormContext.Provider value={{ orderFormData, setOrderFormData }}>
            {children}
        </OrderFormContext.Provider>
    );
};
