import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { useHttpClient } from '../../reusable/hooks/http-hook';
import { AuthContext } from '../../reusable/context/auth-context';
import { useForm } from '../../reusable/hooks/form-hook';
import Button from '../../reusable/FormElements/Button';
import ImageUpload from '../../reusable/FormElements/ImageUpload';
import Input from '../../reusable/FormElements/Input';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { 
  VALIDATOR_REQUIRE
} from '../../reusable/util/validators';

import './AddCategory.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

function AddCategory() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
    {
      name: {
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

	const categorySubmitHandler = async event => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('name', formState.inputs.name.value);
			formData.append('image', formState.inputs.image.value);
			
			// Use formData.get to access values
			console.log("DEBUG -- AddCategory.js -- 1: " + formData.get('name') + ", " + JSON.stringify(formData.get('image')));
			
			await sendRequest(
				'http://localhost:5000/api/categories/create-category',
				'POST',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			navigate('/admin/create-category');
			console.log("DEBUG -- AddCategory.js -- 2: No error");
		} catch (err) {
			console.log("Error[1] in creating product! " + err);
		}
	};
	

  return (
    <div className="admin-form insideBody">
      {!auth.isAdmin && (
      <div className='center'>
        You need to be an admin to - 'create a category'
        <br/>
        to login as admin, go to this route '/admin'
      </div>
      )}
      {auth.token && auth.isAdmin && (
      <div>
        <ErrorModal error={error} onClear={clearError} />
        <form onSubmit={categorySubmitHandler} className='center'>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="name"
            element="input"
            type="text"
            label="Category Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Name."
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Please provide an image."
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD CATEGORY
          </Button>
        </form>
      </div>
      )}
    </div>
  );
}

export default AddCategory;