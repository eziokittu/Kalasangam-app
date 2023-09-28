import './CreateListing.css';
import '../../reusable/reusable.css';

import Button from '../../reusable/FormElements/Button';
import ImageUpload from '../../reusable/FormElements/ImageUpload';
import Input from '../../reusable/FormElements/Input';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { 
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH 
} from '../../reusable/util/validators';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../reusable/hooks/form-hook';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import { AuthContext } from '../../reusable/context/auth-context';

function CreateListing() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const navigate = useNavigate();

  const productSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('image', formState.inputs.image.value);
      // formData.append('creator', auth.userId);
      console.log("DEBUG --- CreateListing --- 1");
      await sendRequest('http://localhost:5000/api/products', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      console.log("DEBUG --- CreateListing --- 2");
      navigate('/');
      console.log("DEBUG --- CreateListing --- 3");
    } catch (err) {
      console.log("Error[1] in creating product!" + err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="product-form" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(3)]}
          errorText="Please enter a valid description (at least 3 characters)."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PRODUCT
        </Button>
      </form>
    </React.Fragment>
  );
}

export default CreateListing;
