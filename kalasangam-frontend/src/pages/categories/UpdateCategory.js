import React, { useContext } from 'react'

import { AuthContext } from '../../reusable/context/auth-context';

import '../../reusable/reusable.css';
import './UpdateCategory.css';

function UpdateCategory() {
  const auth = useContext(AuthContext);

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
          Update Category feature being worked on
          {/* <ErrorModal error={error} onClear={clearError} />
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
          </form> */}
        </div>
      )}

    </div>
  )
}

export default UpdateCategory