import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShippingFormContext } from './ShippingFormContext';

const ShippingDetailsForm = ({ formData, handleAutoFill }) => {
    const { shippingFormData, setShippingFormData } = useContext(ShippingFormContext);

    const [name, setName] = useState(formData.name || '');
    const [state, setState] = useState(formData.state || '');
    const [city, setCity] = useState(formData.city || '');
    const [pincode, setPincode] = useState(formData.pincode || '');
    const [stateUTCode, setStateUTCode] = useState(formData.stateUtCode || '');
    const [address, setAddress] = useState(formData.address || '');

    const navigate = useNavigate();

    // Use useEffect to update state if formData changes externally
    useEffect(() => {
        setName(formData.name || '');
        setState(formData.state || '');
        setCity(formData.city || '');
        setPincode(formData.pincode || '');
        setStateUTCode(formData.stateUtCode || '');
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
            case 'stateUTCode':
                setStateUTCode(value);
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
        // Handle form submission logic, e.g., sending data to a server
        const updatedFormData = {
            name,
            state,
            city,
            pincode,
            stateUTCode,
            address
        };
        setShippingFormData(updatedFormData);
        console.log('Shipping Details submitted:', updatedFormData);
        navigate('/place-of-delivery');
    };

    return (
        <div className="form-container">
            <h2>Shipping Details Form</h2>
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
                    <label htmlFor="stateUTCode">State/UT Code:</label>
                    <input
                        type="text"
                        id="stateUTCode"
                        name="stateUTCode"
                        value={stateUTCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit">Submit</button>
                <button type="button" onClick={() => handleAutoFill(setName,setAddress,setState,setCity,setPincode,setStateUTCode)}>
                    Auto Fill
                </button>
            </form>
        </div>
    );
};

export default ShippingDetailsForm;
