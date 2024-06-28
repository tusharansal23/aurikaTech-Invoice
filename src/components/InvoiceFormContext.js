// InvoiceFormContext.js
import React, { createContext, useState } from 'react';

export const InvoiceFormContext = createContext();

export const InvoiceFormProvider = ({ children }) => {
    const [invoiceFormData, setInvoiceFormData] = useState({});

    return (
        <InvoiceFormContext.Provider value={{ invoiceFormData, setInvoiceFormData }}>
            {children}
        </InvoiceFormContext.Provider>
    );
};
