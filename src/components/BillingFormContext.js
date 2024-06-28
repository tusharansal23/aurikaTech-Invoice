// InvoiceFormContext.js
import React, { createContext, useState } from 'react';

export const BillingFormContext = createContext();

export const BillingFormProvider = ({ children }) => {
    const [billingFormData, setBillingFormData] = useState({});

    return (
        <BillingFormContext.Provider value={{ billingFormData, setBillingFormData }}>
            {children}
        </BillingFormContext.Provider>
    );
};
