import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../reusable/FormElements/ImageUpload';
import Card from '../../reusable/UIElements/Card';
import Input from '../../reusable/FormElements/Input';
import Button from '../../reusable/FormElements/Button';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../reusable/hooks/form-hook';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import { AuthContext } from '../../reusable/context/auth-context';
import './Auth.css';
import '../../reusable/reusable.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
		console.log(formState.inputs);
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.userId, responseData.token, false);
      } catch (err) {
        console.log('ERROR logging in!');
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          // JSON.stringify({
          //   name: formState.inputs.name.value,
          //   email: formState.inputs.email.value,
          //   password: formState.inputs.password.value
          // }),
          // {
          //   'Content-Type': 'application/json'
          // }
          formData
        );

        auth.login(responseData.userId, responseData.token, responseData.isAdmin);
        // auth.login(responseData.user.id);
      } catch (err) {
        console.log('ERROR signing in!');
      }
    }
  };

  const navigate = useNavigate();
  const clickIsAdminHandler = () => {
    navigate('/admin');
  }

  return (
    <div className='flex justify-center insideBody '>
      <ErrorModal error={error} onClear={clearError} />
      {auth.isLoggedIn && auth.isAdmin &&(
        <div className='center'>
          You are logged in as an Admin!
          <br />
          To login as an user, you need to logout!
        </div>
      )}
      {auth.isLoggedIn && !auth.isAdmin &&(
        <div className='center'>
          You are logged in as an User!
        </div>
      )}
      {!auth.isLoggedIn && (
      <div className='text-center w-200'>
        <button
          className=' text-cyan-500 underline border hover:text-cyan-400 active:text-cyan-300 '
          onClick={clickIsAdminHandler}
        >
          Login as Admin?
        </button>
        <br/>
        <br/>
        <Card className="">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2 className='heading'>Login Required</h2>
          <hr />
          <form 
            onSubmit={authSubmitHandler}
          >
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            )}
            {!isLoginMode && (
              <ImageUpload
                center
                id="image"
                onInput={inputHandler}
                errorText="Please provide an image."
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 6 characters."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </Card>
      </div>
      )}
    </div>
  );
};

export default Auth;
