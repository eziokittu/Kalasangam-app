// import './CreateListing.css';
import '../../reusable/reusable.css';

import React, { useState } from 'react';
import axios from 'axios';

function CreateListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const isFormValid = title && description && image; // Condition to check if the form is ready for submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product created successfully');
      // You can redirect or update state to show a success message
    } catch (error) {
      console.error('Error creating product', error);
      // Handle error, display error message, etc.
    }
  };

  return (
    <div className='container insideBody'>
      <h2>Create Listing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={!isFormValid}>Create</button>
      </form>
    </div>
  );
}

export default CreateListing;
