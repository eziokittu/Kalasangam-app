import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import '../../reusable/reusable.css'; // Adjust the path based on your structure
import 'remixicon/fonts/remixicon.css'; // Import Remix Icons CSS

export default function Header(props) {
  return (
    <>
		<header className="header" id="header">
        <nav className="nav container">
           <Link to="/" className="nav__logo"><i className="ri-leaf-fill"></i>{props.appname}</Link>
            <div className="nav__menu" id="nav-menu">
               <ul className="nav__list">
                   <li className="nav__item">
                       <Link to="/" className="nav__link active-link">{props.names[0]}</Link>
                   </li>

                   <li className="nav__item">
                       <Link to="/categories" className="nav__link">{props.names[1]}</Link>
                   </li>

                   <li className="nav__item">
                       <Link to="/products" className="nav__link">{props.names[2]}</Link>
                   </li>

                   <li className="nav__item">
                       <Link to="/create-listing" className="nav__link">{props.names[3]}</Link>
                   </li>
               </ul>
               {/* <!-- close button --> */}
               <div className="nav__close" id="nav-close">
                   {/* <!-- <i className="ri-close-line"></i> --> */}
               </div>
            </div>
            <div className="nav__search">
                <i className="ri-search-2-line"></i>
            <div className="nav__inputbox">
                <input type="text" placeholder="Search Here..."/>
            </div>
            </div>
            <div className="nav__toggle" id="nav-toggle">
               <i className="ri-menu-4-fill"></i>
            </div>
            {/* <!-- <div className="nav__login">
                <i className="ri-login-circle-fill"></i>
            </div> --> */}
       </nav>
     </header>
    </>
  )
}
