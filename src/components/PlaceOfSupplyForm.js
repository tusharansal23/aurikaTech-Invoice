import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceContext } from './PlaceContext';

const PlaceOfSupplyForm = ({ formData, handleAutoFill }) => {
//   const [localPlaceOfSupply, setLocalPlaceOfSupply] = useState(formData.place || '');
  const { placeOfSupply, setPlaceOfSupply } = useContext(PlaceContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPlaceOfSupply(formData.place || '');
  }, [formData]);

  const handleChange = (e) => {
    setPlaceOfSupply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Context Place of Supply before navigation:', placeOfSupply);

    // Navigate only after state is set
    setTimeout(() => {
      console.log('Context Place of Supply after navigation:', placeOfSupply);
      if (placeOfSupply.trim() !== '') {
        // alert(placeOfSupply);
        navigate('/billing-details');
      }
    }, 0);
  };

  return (
    <div className="form-container">
      <h2>Place of Supply Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="placeOfSupply">Place of Supply:</label>
          <input
            type="text"
            id="placeOfSupply"
            name="placeOfSupply"
            value={placeOfSupply}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" >Submit</button>
        <button type="button" onClick={() => handleAutoFill(setPlaceOfSupply)}>
          Auto Fill
        </button>
      </form>
    </div>
  );
};

export default PlaceOfSupplyForm;
