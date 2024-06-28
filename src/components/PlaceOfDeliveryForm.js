import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from './ItemContext';
import { PlaceContext } from './PlaceContext';

const PlaceOfDeliveryForm = ({ formData, handleAutoFill }) => {
  const {placeOfDelivery, setPlaceOfDelivery} = useContext(PlaceContext);
  const navigate = useNavigate();
  const[isDisabled,setIsDisabled]=useState(false);

  useEffect(() => {
    
    setPlaceOfDelivery(formData.deliveryPlace || '');
    
  }, [formData]);

  const handleChange = (e) => {
    setPlaceOfDelivery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Place of Delivery submitted:', placeOfDelivery);

    setTimeout(() => {
      console.log('Context Place of Delivery after navigation:', placeOfDelivery);
      if (placeOfDelivery.trim() !== '') { // Check if placeOfDelivery is truthy and not empty after trimming
        // alert(placeOfDelivery);
        navigate('/order-details');
      }
    }, 0);
  };

  return (
    <div className="form-container">
      <h2>Place of Delivery Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="placeOfDelivery">Place of Delivery:</label>
          <input
            type="text"
            id="placeOfDelivery"
            name="placeOfDelivery"
            value={placeOfDelivery}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit"  >Submit</button>
        <button type="button" onClick={() => handleAutoFill(setPlaceOfDelivery)}>
                    Auto Fill
                </button>
      </form>
    </div>
  );
};

export default PlaceOfDeliveryForm;
