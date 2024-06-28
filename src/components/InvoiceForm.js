import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvoiceFormContext } from './InvoiceFormContext';
const InvoiceForm = ({ formData, handleAutoFill }) => {

    const { invoiceFormData, setInvoiceFormData } = useContext(InvoiceFormContext);
    const [name, setName] = useState(formData.name || '');
    const [state, setState] = useState(formData.state || '');
    const [city, setCity] = useState(formData.city || '');
    const [pincode, setPincode] = useState(formData.pincode || '');
    const [pan, setPan] = useState(formData.panNo || '');
    const [gst, setGst] = useState(formData.gstNo || '');
    const [address, setAddress] = useState(formData.address || '');

    const navigate = useNavigate();

    // Use useEffect to update state if formData changes externally
    useEffect(() => {
        setName(formData.name || '');
        setState(formData.state || '');
        setCity(formData.city || '');
        setPincode(formData.pincode || '');
        setPan(formData.panNo || '');
        setGst(formData.gstNo || '');
        setAddress(formData.address || '');
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'state':
                setState(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'pincode':
                setPincode(value);
                break;
            case 'pan':
                setPan(value);
                break;
            case 'gst':
                setGst(value);
                break;
            case 'address':
                setAddress(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            name,
            state,
            city,
            pincode,
            pan,
            gst,
            address
        };
        setInvoiceFormData(updatedFormData);
        console.log('Form submitted:', updatedFormData);
        navigate('/place-of-supply');
    };

    return (
        <div className="form-container">
            <h2>Seller Details Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={pincode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pan">PAN No.:</label>
                    <input
                        type="text"
                        id="pan"
                        name="pan"
                        value={pan}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gst">GST Registration No.:</label>
                    <input
                        type="text"
                        id="gst"
                        name="gst"
                        value={gst}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => handleAutoFill(setName, setState, setCity, setPincode, setPan, setGst, setAddress)}>
                    Auto Fill
                </button>
            </form>
        </div>
    );
};

export default InvoiceForm;
