import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReverseChargeContext } from './ReverseChargeContext';

const ReverseChargeForm = ({ formData,handleAutoFill }) => {
    const { reverseCharge, setReverseCharge } = useContext(ReverseChargeContext);

    // const [reverseCharge, setReverseCharge] = useState(formData.reverseCharge || '');
    const navigate = useNavigate();

    // Use useEffect to update state if formData changes externally
    useEffect(() => {
        setReverseCharge(formData.reverseCharge || '');
    }, [formData]);

    const handleChange = (e) => {
        setReverseCharge(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic, e.g., sending data to a server
        // const updatedFormData = {
        //     reverseCharge
        // };
        // setReverseChargeData(updatedFormData);
        console.log('Reverse charge submitted:', reverseCharge);
        navigate('/item-details'); // Navigate to the next form
    };

    return (
        <div className="form-container">
            <h2>Reverse Charge Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Reverse Charge:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="reverseCharge"
                                value="yes"
                                checked={reverseCharge === 'yes'}
                                onChange={handleChange}
                                required
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="reverseCharge"
                                value="no"
                                checked={reverseCharge === 'no'}
                                onChange={handleChange}
                                required
                            />
                            No
                        </label>
                    </div>
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => handleAutoFill(setReverseCharge)}>
                    Auto Fill
                </button>
            </form>
        </div>
    );
};

export default ReverseChargeForm;
