import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../reusable/context/auth-context';
import './NavLinks.css';
import 'remixicon/fonts/remixicon.css'

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    // <ul className='nav-links'>
    //   <li><ul className='flex flex-row justify-between'>
    //     <li className='m-[1rem]'>
    //       <NavLink to="/" className="nav__logo">
    //         <i className="ri-leaf-fill"/>
    //         KalaSangam
    //       </NavLink>
    //     </li>
    //   </ul></li>
    //   <li><ul className='flex flex-col justify-around'>
    //     <li className='m-[1rem]'>
    //       <NavLink to="/categories" exact>
    //         Categories
    //       </NavLink>
    //     </li>
    //     <li className='m-[1rem]'>
    //       <NavLink to="/products" exact>
    //         Products
    //       </NavLink>
    //     </li>
    //   </ul></li>
    //   <li><ul className='flex flex-col justify-around'>
    //   <li className='m-[1rem]'>
    //       <NavLink to="/products" exact>
    //         Login
    //       </NavLink>
    //     </li>
    //   </ul></li>
    // </ul>
    <ul className="nav-links">
      <li>
        <NavLink to="/" className="nav__logo"><i className="ri-leaf-fill"></i>KalaSangam</NavLink>
      </li>
      <li>
        <NavLink to="/categories" exact>Categories</NavLink>
      </li>
      <li>
        <NavLink to="/products" exact>Products</NavLink>
      </li>

      {auth.isLoggedIn && auth.isAdmin && (
        <li>
          {/* <NavLink to={`/create-listing`}>{props.names[3]}</NavLink> */}
          <NavLink to={`/admin/create-category`}>Create Category</NavLink>
        </li>
      )}

      {auth.isLoggedIn && !auth.isAdmin && (
        <li>
          {/* <NavLink to={`/create-listing`}>{props.names[3]}</NavLink> */}
          <NavLink to={`/${auth.userId}/my-products`}>My Products</NavLink>
        </li>
      )}
      {auth.isLoggedIn && !auth.isAdmin && (
        <li>
          {/* <NavLink to={`/create-listing`}>{props.names[3]}</NavLink> */}
          <NavLink to={`/${auth.userId}/create-listing`}>Create Listing</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/profile/${auth.userId}`}>Profile</NavLink>
        </li>
      )}
      {/* {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )} */}
      
      {!auth.isLoggedIn && (
        <li className="nav__login">
          <NavLink to="/auth" className="nav__link active-link">LOGIN</NavLink>
        </li>
      )}
      

    </ul>
  );
};

export default NavLinks;
