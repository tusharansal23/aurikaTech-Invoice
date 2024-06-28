import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from './ItemContext';

const ItemDetailsForm = ({formData, handleAutoFill}) => {

  
  const [items, setItems] = useContext(ItemContext);
  const [description, setDescription] = useState(formData.description || '');
  const [unitPrice, setUnitPrice] = useState(formData.unitPrice || '');
  const [quantity, setQuantity] = useState(formData.quantity || '');
  const [discount, setDiscount] = useState(formData.discount || '');
  
  const [currentItem, setCurrentItem] = useState({
    description: formData.description || '',
    unitPrice: formData.unitPrice || '',
    quantity: formData.quantity || '',
    discount: formData.discount || ''
  });


  useEffect(() => {
    setDescription(formData.description || '');
    setUnitPrice(formData.unitPrice || '');
    setQuantity(formData.quantity || '');
    setDiscount(formData.discount || '');
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
          ...currentItem,
          [name]: value
        });
    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'unitPrice':
        setUnitPrice(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'discount':
        setDiscount(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending data to a server
    const updatedFormData = {
      description,
      unitPrice,
      quantity,
      discount,
    };
    console.log('Item details submitted:', updatedFormData);
    // Navigate to the next form or perform another action
    // navigate('/net-amount');
    if(items.length=== 0){
      alert('atleast one item is required')
    }
    else{
      navigate('/image-uploader');

    }
  };

  //const [items, setItems] = useState([]);  
  
  const [editIndex, setEditIndex] = useState(null);
  const [isFirstAdd, setIsFirstAdd] = useState(true);

  const navigate = useNavigate();


  const handleAddItem = (e) => {
    e.preventDefault();
    setTimeout(() => {
      // alert(currentItem.description, currentItem.unitPrice, currentItem.quantity);
      if (currentItem.description && currentItem.unitPrice && currentItem.quantity) {
        if (isFirstAdd) {
          setItems([currentItem]); // Set items to contain only the current item
          setIsFirstAdd(false); // Update state to indicate the first add click is done
        } 
        else if (editIndex !== null) {
          const updatedItems = [...items];
          updatedItems[editIndex] = currentItem;
          setItems(updatedItems);
          setEditIndex(null);
        } else {
          // alert(currentItem.description,currentItem.unitPrice,currentItem.quantity);
            if (currentItem.description && currentItem.unitPrice && currentItem.quantity) {
              setItems([...items, currentItem]);
            }
        }
        setCurrentItem({
          description: '',
          unitPrice: '',
          quantity: '',
          discount: ''
        });
      };
    }, 0);
  }

  const handleEditItem = (index) => {
    setCurrentItem(items[index]);
    setEditIndex(index);
  };


  return (
    <div className="form-container">
      <h2>Item Details Form</h2>
      {Array.isArray(items) && items.map((item, index) => (
        <div key={index} className="item-summary">
          <p><strong>Item {index + 1}:</strong> {item.description}, {item.unitPrice}, {item.quantity}, {item.discount}</p>
          <button onClick={() => handleEditItem(index)}>Edit</button>
        </div>
      ))}
      <form /*onSubmit={handleAddItem}*/>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={currentItem.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price:</label>
          <input
            type="text"
            id="unitPrice"
            name="unitPrice"
            value={currentItem.unitPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={currentItem.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Discount:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={currentItem.discount}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleAddItem}>{editIndex !== null ? 'Save Changes' : 'Add Item'}</button>
      </form>
      <button onClick={handleSubmit} disabled= {items.length === 0}>Submit All Items</button>
      <button type="button" onClick={() => handleAutoFill(setCurrentItem)}>
                    Auto Fill
                </button>
    </div>
  );
};

export default ItemDetailsForm;
