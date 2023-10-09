import './CreateListing.css';
import '../../reusable/reusable.css';

import Button from '../../reusable/FormElements/Button';
import ImageUpload from '../../reusable/FormElements/ImageUpload';
import Input from '../../reusable/FormElements/Input';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import DropDown from '../../reusable/FormElements/DropDown';
import { 
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH 
} from '../../reusable/util/validators';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../reusable/hooks/form-hook';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import { useStateWithCallback } from '../../reusable/hooks/useStateWithCallback-hook';
import { AuthContext } from '../../reusable/context/auth-context';


function CreateListing() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [category, setCategory] = useStateWithCallback('Choose a product category');
  const [categoryTitle, setCategoryTitle] = useStateWithCallback('Choose a product category');

  // this method to be passed as a prop to the dropdown component, to get the selected option
  const getCategory = (c) => {
    setCategory(c, (prevValue, c) => {
      console.log('DEBUG 2 -- CreateListing.js -- '+category);
    });
    setCategoryTitle("Selected Category: "+c, (prevValue, c) => {
    });
  };

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

  const [linkFb, setLinkFb] = useState('https://www.facebook.com/');
  const [linkIg, setLinkIg] = useState('https://www.instagram.com/');
  const [linkTw, setLinkTw] = useState('https://twitter.com/');
  const [linkWb, setLinkWb] = useState('https://www.google.com/');
  const getSocialLinkFb = (event) => {
    setLinkFb(event.target.value);
    console.log('The link found is - '+event.target.value);
  }
  const getSocialLinkIg = (event) => {
    setLinkIg(event.target.value);
    console.log('The link found is - '+event.target.value);
  }
  const getSocialLinkWb = (event) => {
    setLinkWb(event.target.value);
    console.log('The link found is - '+event.target.value);
  }
  const getSocialLinkTw = (event) => {
    setLinkTw(event.target.value);
    console.log('The link found is - '+event.target.value);
  }
     
  const navigate = useNavigate();

  const productSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('category', category);
      formData.append('image', formState.inputs.image.value);
      
      formData.append('facebook', linkFb);
      formData.append('website', linkWb);
      formData.append('instagram', linkIg);
      formData.append('twitter', linkTw);

      // console.log("DEBUG --- CreateListing --- 1: ");
      await sendRequest('http://localhost:5000/api/products', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      // console.log("DEBUG --- CreateListing --- 2");
      navigate('/');
      // console.log("DEBUG --- CreateListing --- 3");
    } catch (err) {
      console.log("Error[1] in creating product!" + err);
    }
  };
  
  const [loadedCategoryNames, setLoadedCategoryNames] = useState([]);
  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/categories/get-names`
        );
        setLoadedCategoryNames(responseData.categoryNames);
        console.log(responseData.categoryNames);
        setCategory(responseData.categoryNames[0]);
        console.log('Category set to: '+category);
      } catch (err) {
        console.log("Error in fetching category names: "+err);
      }
    };
    fetchCategoryNames();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="product-form center" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className='title'>Create a Product Listing</div>

        <div>
          <DropDown 
            onSubmit={getCategory}
            items={loadedCategoryNames}
            title={categoryTitle}
          />
        </div>

        <br />

        {/* product title text input field */}
        <div className='input-text'>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
        </div>

        {/* description text area input field */}
        <div className='input-text'>
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(3)]}
            errorText="Please enter a valid description (at least 3 characters)."
            onInput={inputHandler}
          />
        </div>
        

        <div className='input-file justify-center'>
          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Please provide an image."
          />
        </div>
        <br/><br/>
        {/* getting social media links (optional) */}
        <div className='c'>
        <br/><label className='text-xl font-medium text-gray-900 dark:text-white'>Social Media Links:</label><br/>
          <br/><label for="small-input" class="text-xs block mb-2 font-normal text-gray-900 dark:text-pink-200">FaceBook</label>
          <input type="text" id="small-input" class="w-[85%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-rose-200 dark:placeholder-gray-500 dark:text-gray-800 dark:border-sky-950 " placeholder='Enter facebook link' onChange={getSocialLinkFb}></input>
          <br/><br/><label for="small-input" class="text-xs block mb-2 font-normal text-gray-900 dark:text-pink-200">Instagram</label>
          <input type="text" id="small-input" class="w-[85%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-rose-200 dark:placeholder-gray-500 dark:text-gray-800 dark:border-sky-950 " placeholder='Enter Instagram link' onChange={getSocialLinkIg}></input>
          <br/><br/><label for="small-input" class="text-xs block mb-2 font-normal text-gray-900 dark:text-pink-200">Twitter</label>
          <input type="text" id="small-input" class="w-[85%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-rose-200 dark:placeholder-gray-500 dark:text-gray-800 dark:border-sky-950 " placeholder='Enter Twitter link' onChange={getSocialLinkTw}></input>
          <br/><br/><label for="small-input" class="text-xs block mb-2 font-normal text-gray-900 dark:text-pink-200">Website</label>
          <input type="text" id="small-input" class="w-[85%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-rose-200 dark:placeholder-gray-500 dark:text-gray-800 dark:border-sky-950 " placeholder='Enter Website link' onChange={getSocialLinkWb}></input>
        </div>


        {/* Submit button for adding product */}
        <div className='button-submit mt-5'>
          <Button type="submit" disabled={!formState.isValid}>
            ADD PRODUCT
          </Button>
        </div>

      </form>
    </React.Fragment>
  );
}

export default CreateListing;
