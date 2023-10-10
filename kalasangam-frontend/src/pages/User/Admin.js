import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../reusable/reusable.css';
import './Admin.css';

import { useHttpClient } from '../../reusable/hooks/http-hook';
import { AuthContext } from '../../reusable/context/auth-context';

const Admin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
	const auth = useContext(AuthContext);
  const { sendRequest} = useHttpClient();

	const adminSubmitHandler = async event => {
    event.preventDefault();
		console.log("DEBUG -- Admin.js -- name: "+name+", password: "+password);
		try {
			const responseData = await sendRequest(
				'http://localhost:5000/api/admins/adminLogin',
				'POST',
				JSON.stringify({
					name: name,
					password: password
				}),
				{
					'Content-Type': 'application/json'
				}
			);
			auth.login(responseData.userId, responseData.token, true);
		} catch (err) {
			console.log('ERROR logging in as ADMIN!');
		}
  };

  const navigate = useNavigate();
  const clickIsUserHandler = () => {
    navigate('/auth');
  }

  return (
    // <div className="admin-form insideBody">
    <div className="insideBody">
      {auth.isLoggedIn && !auth.isAdmin && (
        <div className='center'>
          You need to logout and re-login as an ADMIN
          <br />
          from this route - '/admin'.
        </div>
      )}
      {auth.isLoggedIn && auth.isAdmin && (
        <div className='center'>
          You are logged in as an admin
        </div>
      )}
      {!auth.isLoggedIn && (
      <form onSubmit={adminSubmitHandler} className=' center'>
        <div>
          Not an admin? 
          <br />
          <button
            className=' text-cyan-500 underline border hover:text-cyan-400 active:text-cyan-300 '
            onClick={clickIsUserHandler}
          >
            Login as an user
          </button>
          <br/>
          <br/>
        </div>

        <label className='text-green-300'>Are you an admin?</label>
        <br/>
        <input type="text" id="admin-name" className="w-[85%] sm:w-[60%] lg:w-[35%] p-2 mb-1 text-gray-900 border border-gray-300 rounded-lg  dark:bg-rose-200 dark:placeholder-gray-500 dark:text-gray-800 dark:border-sky-950 " placeholder='Enter name' value={name} onChange={(event) => setName(event.target.value)}></input>
        <br/>
        <input type="text" id="admin-password" className="w-[85%] sm:w-[60%] lg:w-[35%] mb-1 p-2 text-gray-900 border border-gray-300 rounded-lg dark:bg-rose-200 dark:placeholder-gray-500 dark:text-gray-800  " placeholder='Enter password' value={password} onChange={(event) => setPassword(event.target.value)}></input>
        <br/>
        <button type="submit" className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-rose-200 active:bg-teal-600 font-bold text-lg px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        {/* admin-button */}
          Submit
        </button>
				{/* {isSecretCorrect && (<><br/><p>You are an admin!</p></>)} */}
      </form>
      )}
      
    </div>
  );
};

export default Admin;
