import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../../reusable/FormElements/Input';
import ImageUpload from '../../reusable/FormElements/ImageUpload';
import Button from '../../reusable/FormElements/Button';
import Card from '../../reusable/UIElements/Card';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../reusable/util/validators';
import { useForm } from '../../reusable/hooks/form-hook';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import { AuthContext } from '../../reusable/context/auth-context';
import '../../reusable/reusable.css';
import './UpdateCategory.css';

function UpdateCategory() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCategory, setLoadedCategory] = useState();
  const categoryId = useParams().cid;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {   
      name: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        console.log("DEBUG -- CategoryItem.js -- 1: cid: "+categoryId);
        const responseData = await sendRequest(
					`http://localhost:5000/api/categories/get-categories/${categoryId}`
        );
        setLoadedCategory(responseData.category);
        setFormData(
          {
            name: {
              value: responseData.category.name,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchcategory();
  }, [sendRequest, categoryId, setFormData]);

  const categoryUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/categories/${categoryId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      navigate('/categories');
    } catch (err) {}
  };

  return (
    <div className='insideBody'>
      {!auth.isAdmin && (
        <div className='center'>
          You need to be an admin to - 'update a category'
          <br/>
          to login as admin, go to this route '/admin'
        </div>
      )}

      {auth.isAdmin && (
        <div>
          {/* {isLoading && (
            <div className="center">
              Loading Categories!
              <LoadingSpinner />
            </div>
          )} */}
          {/* {!loadedCategory && !error && (
            <div className="center">
              <Card>
                <h2>Could not find category!</h2>
              </Card>
            </div>
          )} */}
          {!isLoading && loadedCategory && (
            <React.Fragment>
              <ErrorModal error={error} onClear={clearError} />
              <form onSubmit={categoryUpdateSubmitHandler} className='center product-form'>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                  id="name"
                  element="input"
                  type="text"
                  label="Category Name"
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
                  errorText="Please enter a valid Name (minimum 3 chars)."
                  onInput={inputHandler}
                />
                {/* <ImageUpload
                  id="image"
                  onInput={inputHandler}
                  errorText="Please provide an image."
                /> */}
                <Button type="submit" disabled={!formState.isValid}>
                  UPDATE CATEGORY
                </Button>
              </form>
            </React.Fragment>
          )}
        </div>
      )}

    </div>
  )
}

export default UpdateCategory