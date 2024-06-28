import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from './ImageContext';
import defaultImageURL from '../images/test.png'; // Adjust the path as per your project structure

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Initialize with null
  const { setSelectedImage: setImage } = useContext(ImageContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Set default image on component mount
    setSelectedImage(defaultImageURL);
    setImage(defaultImageURL); // Update context with default image
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setSelectedImage(reader.result); // Update selectedImage state with the new image URL
      };
      reader.readAsDataURL(file);
    } else {
      setImage(defaultImageURL); // Reset image context to default
      setSelectedImage(defaultImageURL); // Reset selectedImage state to default
    }
  };

  const handleResetImage = () => {
    setImage(defaultImageURL); // Reset image context to default
    setSelectedImage(defaultImageURL); // Reset selectedImage state to default
  };

  const handleSubmit = () => {
    // Always navigate to net-amount page, passing selectedImage or defaultImageURL as query parameter
    navigate(`/net-amount?image=${selectedImage}`);
  };

  return (
    <div className="image-uploader">
      <h2>Image Uploader</h2>
      <div className="image-preview">
        {selectedImage && (
          <img src={selectedImage} alt="Preview" style={{ width: '150px', height: '150px' }} />
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleResetImage}>Reset to Default Image</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ImageUploader;
