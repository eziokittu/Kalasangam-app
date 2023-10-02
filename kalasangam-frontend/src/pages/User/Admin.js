import React, { useState, useContext } from 'react';

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
			auth.login(responseData.userId, responseData.token, responseData.isAdmin);
		} catch (err) {
			console.log('ERROR logging in as ADMIN!');
		}
  };

  return (
    <div className="admin-form insideBody">
      <form onSubmit={adminSubmitHandler} className='center'>
        <label>Are you an admin?</label>
        <input
          type="text"
          id="admin-name"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
				<input
          type="text"
          id="admin-password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="admin-button">
          Submit
        </button>
				{/* {isSecretCorrect && (<><br/><p>You are an admin!</p></>)} */}
      </form>
      
    </div>
  );
};

export default Admin;
