import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvoiceDetailsFormContext } from './InvoiceDetailsContext';

const InvoiceDetailsForm = ({ formData, handleAutoFill }) => {
    const { invoiceDetailsFormData, setInvoiceDetailsFormData } = useContext(InvoiceDetailsFormContext);

    const [invoiceNumber, setInvoiceNumber] = useState(formData.invoiceNo || '');
    const [invoiceDetails, setInvoiceDetails] = useState(formData.invoiceDetails || '');
    const [invoiceDate, setInvoiceDate] = useState(formData.invoiceDate || '');
    const navigate = useNavigate();

    // Use useEffect to update state if formData changes externally
    useEffect(() => {
        setInvoiceNumber(formData.invoiceNo || '');
        setInvoiceDetails(formData.invoiceDetails || '');
        setInvoiceDate(formData.invoiceDate || '');
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'invoiceNumber':
                setInvoiceNumber(value);
                break;
            case 'invoiceDetails':
                setInvoiceDetails(value);
                break;
            case 'invoiceDate':
                setInvoiceDate(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic, e.g., sending data to a server
        const updatedFormData = {
            invoiceNumber,
            invoiceDetails,
            invoiceDate
        };
        setInvoiceDetailsFormData(updatedFormData);
        console.log('Invoice details submitted:', updatedFormData);
        navigate('/reverse-charge');
    };

    return (
        <div className="form-container">
            <h2>Invoice Details Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="invoiceNumber">Invoice No.:</label>
                    <input
                        type="text"
                        id="invoiceNumber"
                        name="invoiceNumber"
                        value={invoiceNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="invoiceDetails">Invoice Details:</label>
                    <input
                        type="text"
                        id="invoiceDetails"
                        name="invoiceDetails"
                        value={invoiceDetails}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="invoiceDate">Invoice Date:</label>
                    <input
                        type="date"
                        id="invoiceDate"
                        name="invoiceDate"
                        value={invoiceDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => handleAutoFill(setInvoiceNumber,setInvoiceDetails,setInvoiceDate)}>
                    Auto Fill
                </button>
            </form>
        </div>
    );
};

export default InvoiceDetailsForm;
