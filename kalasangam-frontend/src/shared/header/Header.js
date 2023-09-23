import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../../reusable/UIElements/Backdrop';
import SideDrawer from '../../reusable/Navigation/SideDrawer';
import { AuthContext } from '../../reusable/context/auth-context'
import './Header.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure
import 'remixicon/fonts/remixicon.css'; // Import Remix Icons CSS

export default function Header(props) {
	const auth = useContext(AuthContext);
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
		<header className="header" id="header">
			<nav className="nav container">
				<Link to="/" className="nav__logo"><i className="ri-leaf-fill"></i>{props.appname}</Link>

				{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
				<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
					<nav className="main-navigation__drawer-nav">
						
					</nav>
				</SideDrawer>

				<MainHeader>

				</MainHeader>

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
							<Link to="/products/create-listing" className="nav__link">{props.names[3]}</Link>
						</li>
					</ul>
					{/* <!-- close button --> */}
					<div className="nav__close" id="nav-close">
						{/* <!-- <i className="ri-close-line"></i> --> */}
					</div>
				</div>
				{/* <div className="nav__search">
					<i className="ri-search-2-line"></i>
					<div className="nav__inputbox">
						<input type="text" placeholder="Search Here..."/>
					</div>
				</div>
				<div className="nav__toggle" id="nav-toggle">
					<i className="ri-menu-4-fill"></i>
				</div> */}
				<div className="nav__login">
					<Link to="/auth" className="nav__link active-link">{props.names[4]}</Link>
				</div>
			</nav>
     </header>
    </>
  )
}
