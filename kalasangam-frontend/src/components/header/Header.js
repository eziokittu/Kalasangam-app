import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import '../reusable.css'; // Adjust the path based on your structure
import 'remixicon/fonts/remixicon.css'; // Import Remix Icons CSS

export default function Header() {
  return (
    <>
		<header className="header" id="header">
        <nav className="nav container">
           <Link to="/" className="nav__logo"><i className="ri-leaf-fill"></i>KalaSangam</Link>
            <div className="nav__menu" id="nav-menu">
               <ul className="nav__list">
                   <li className="nav__item">
                       <Link to="/" className="nav__link active-link">Home</Link>
                   </li>

                   <li className="nav__item">
                       <Link to="/About" className="nav__link">About</Link>
                   </li>

                   <li className="nav__item">
                       <Link to="/products" className="nav__link">Products</Link>
                   </li>

                   <li className="nav__item">
                       <Link to="/Explore" className="nav__link">Explore</Link>
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
