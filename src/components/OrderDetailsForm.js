import React, { useState, useEffect,  useContext } from 'react';
import './OrderDetailsForm.css';
import { useNavigate } from 'react-router-dom';
import { OrderFormContext } from './OrderContext';

const OrderDetailsForm = ({ formData, handleAutoFill }) => {
    const { orderFormData, setOrderFormData } = useContext(OrderFormContext);

    const [orderNumber, setOrderNumber] = useState(formData.orderNo || '');
    const [orderDate, setOrderDate] = useState(formData.orderDate || '');
    const navigate = useNavigate();

    // Use useEffect to update state if formData changes externally
    useEffect(() => {
        setOrderNumber(formData.orderNo || '');
        setOrderDate(formData.orderDate || '');
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'orderNumber':
                setOrderNumber(value);
                break;
            case 'orderDate':
                setOrderDate(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic, e.g., sending data to a server
        const updatedFormData = {
            orderNumber,
            orderDate
        };
        setOrderFormData(updatedFormData);
        console.log('Order details submitted:', updatedFormData);
        navigate('/invoice-details');
    };

    return (
        <div className="form-container">
            <h2>Order Details Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="orderNumber">Order No.:</label>
                    <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={orderNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="orderDate">Order Date:</label>
                    <input
                        type="date"
                        id="orderDate"
                        name="orderDate"
                        value={orderDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => handleAutoFill(setOrderNumber,setOrderDate)}>
                    Auto Fill
                </button>
            </form>
        </div>
    );
};

export default OrderDetailsForm;
