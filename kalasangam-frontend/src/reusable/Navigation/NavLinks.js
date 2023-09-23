import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../reusable/context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>{props.names[0]}</NavLink>
      </li>
      <li>
        <NavLink to="/categories" exact>{props.names[1]}</NavLink>
      </li>
      <li>
        <NavLink to="/products" exact>{props.names[2]}</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/create-listing`}>{props.names[3]}</NavLink>
        </li>
        
      )}
      {!auth.isLoggedIn && (
        <li className="nav__login">
          <NavLink to="/auth" className="nav__link active-link">{props.names[4]}</NavLink>
        </li>
      )}
      
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )} */}
    </ul>
  );
};

export default NavLinks;
