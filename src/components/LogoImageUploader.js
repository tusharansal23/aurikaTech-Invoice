import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoImageContext } from './LogoImageContext';
import defaultImageURL from '../images/LOGO.png'; // Adjust the path as per your project structure

const LogoImageUploader = () => {
  const [logoSelectedImage, setLogoSelectedImage] = useState(null); // Initialize with null
  const { setLogoSelectedImage: setImage } = useContext(LogoImageContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Set default image on component mount
    setLogoSelectedImage(defaultImageURL);
    setImage(defaultImageURL); // Update context with default image
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setLogoSelectedImage(reader.result); // Update selectedImage state with the new image URL
      };
      reader.readAsDataURL(file);
    } else {
      setImage(defaultImageURL); // Reset image context to default
      setLogoSelectedImage(defaultImageURL); // Reset selectedImage state to default
    }
  };

  const handleResetImage = () => {
    setImage(defaultImageURL); // Reset image context to default
    setLogoSelectedImage(defaultImageURL); // Reset selectedImage state to default
  };

  const handleSubmit = () => {
    // Always navigate to net-amount page, passing selectedImage or defaultImageURL as query parameter
    // navigate(`/net-amount?image=${logoSelectedImage}`);
    navigate('/seller-form');
  };

  return (
    <div className="image-uploader">
      <h2>Upload Company Logo</h2>
      <div className="image-preview">
        {logoSelectedImage && (
          <img src={logoSelectedImage} alt="Preview" style={{ width: '150px', height: '150px' }} />
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleResetImage}>Reset to Default Image</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LogoImageUploader;
