// InvoiceFormContext.js
import React, { createContext, useState } from 'react';

export const InvoiceDetailsFormContext = createContext();

export const InvoiceDetailsFormProvider = ({ children }) => {
    const [invoiceDetailsFormData, setInvoiceDetailsFormData] = useState({});

    return (
        <InvoiceDetailsFormContext.Provider value={{ invoiceDetailsFormData, setInvoiceDetailsFormData }}>
            {children}
        </InvoiceDetailsFormContext.Provider>
    );
};
