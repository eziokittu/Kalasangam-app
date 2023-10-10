import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import { AuthContext } from '../../reusable/context/auth-context';

import './Profile.css';
import '../../reusable/reusable.css';

function Profile() {
  const auth = useContext(AuthContext);
	const [user, setUser] = useState(null);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const userId = auth.userId;

	useEffect(() => {
		const fetchUser = async () => {
			try {
				console.log('DEBUG -- Profile.js -- 1: '+userId);
				const responseData = await sendRequest(
					`http://localhost:5000/api/users/${userId}`
				);
				console.log('DEBUG -- Profile.js -- 2: user: '+responseData.user.name);
				setUser(responseData.user);
			} catch (err) {
				console.log("Error in fetching user: "+err);
			}
		};
		fetchUser();
	}, [sendRequest, userId]);

  return (
    <div className='insideBody flex flex-col center'>
			{ !auth.isLoggedIn && (
				<div>
					You need to login first, to view your profile!
					<br/>
					
					<NavLink to='/auth'>
						<h3 className='cursor-pointer underline text-cyan-400 hover:text-cyan-500 active:text-cyan-600 transition'>
							Click Here!
						</h3> 
					</NavLink>
					to login
				</div>
			)}
			{ auth.isLoggedIn && (
				<div className="center">
					<button 
						className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-700 hover:text-rose-200 active:bg-red-700 font-bold text-lg px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
						onClick={auth.logout}>
						LOGOUT
					</button>
				</div>
			)}
			{ auth.isLoggedIn && auth.isAdmin && (
				<div className="center">
					<br/>Admin Profile
				</div>
			)}
			{ auth.isLoggedIn && !auth.isAdmin && isLoading && (
				<div className="center">
					<LoadingSpinner />
					<h3>Loading User Profile...</h3>
				</div>
			)}
			{ auth.isLoggedIn && !auth.isAdmin && !isLoading && user && (
				<div>
					<ErrorModal error={error} onClear={clearError} />

					<Card className="custom-card ">

						<Card.Img variant="top" src={`http://localhost:5000/${user.image}`} />

						<Card.Body>
							{auth.userId}
							<div>
								Name <h2 className='text-black text-2xl'>
									{user.name}
								</h2>
							</div>
							<div>
								Email <h2 className='text-black text-2xl'>
									{user.email}
								</h2>
							</div>
							
						</Card.Body>

						{/* <div className="card-links">
							<button onClick={()=>{window.open(`${props.website}`, '_blank')}}>Website</button>
							<button onClick={()=>{window.open(`${props.instagram}`, '_blank')}}>Instagram</button>
							<button onClick={()=>{window.open(`${props.facebook}`, '_blank')}}>Facebook</button>
							<button onClick={()=>{window.open(`${props.twitter}`, '_blank')}}>Twitter</button>
						</div> */}

						<div className="card-links">
							{/* <Link to={`/products/${props.id}`}>
								<Button>Change Details</Button>
							</Link> */}
							<button className='text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-rose-200 active:bg-teal-600 font-bold text-lg px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
								Change Details
							</button>
							<button className='text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-700 hover:text-rose-200 active:bg-red-700 font-bold text-lg px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
								Delete Profile
							</button>
						</div>

					</Card>
				</div>
			)}
		</div>
  )
}

export default Profile