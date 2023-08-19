// import './CreateListing.css';
import '../../reusable/reusable.css';
import Button from '../../reusable/FormElements/Button';
import ImageUpload from '../../reusable/FormElements/ImageUpload';
import Input from '../../reusable/FormElements/Input';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../reusable/util/validators';
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
    // <React.Fragment>
    //   <ErrorModal error={error} onClear={clearError} />
    //   <form className="place-form" onSubmit={placeSubmitHandler}>
    //     {isLoading && <LoadingSpinner asOverlay />}
    //     <Input
    //       id="title"
    //       element="input"
    //       type="text"
    //       label="Title"
    //       validators={[VALIDATOR_REQUIRE()]}
    //       errorText="Please enter a valid title."
    //       onInput={inputHandler}
    //     />
    //     <Input
    //       id="description"
    //       element="textarea"
    //       label="Description"
    //       validators={[VALIDATOR_MINLENGTH(5)]}
    //       errorText="Please enter a valid description (at least 5 characters)."
    //       onInput={inputHandler}
    //     />
    //     <Input
    //       id="address"
    //       element="input"
    //       label="Address"
    //       validators={[VALIDATOR_REQUIRE()]}
    //       errorText="Please enter a valid address."
    //       onInput={inputHandler}
    //     />
    //     <ImageUpload
    //       id="image"
    //       onInput={inputHandler}
    //       errorText="Please provide an image."
    //     />
    //     <Button type="submit" disabled={!formState.isValid}>
    //       ADD PLACE
    //     </Button>
    //   </form>
    // </React.Fragment>
  );
}

export default CreateListing;
