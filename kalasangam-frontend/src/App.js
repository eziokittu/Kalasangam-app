import './App.css';
import IMAGES from './images/images.js'
import { 
  BrowserRouter,
  Routes, 
  Navigate,
  Route,
} from 'react-router-dom';
import React from 'react';

import MainNavigation from './reusable/Navigation/MainNavigation';
import Footer from './shared/footer/Footer';
import Main from './pages/main/Main';
import About from './pages/about/About';
import Products from './pages/products/Products';
import MyProducts from './pages/myProducts/MyProducts';
import UpdateProduct from './pages/myProducts/UpdateProduct';
import CreateListing from './pages/createListing/CreateListing';
import { AuthContext } from './reusable/context/auth-context';
import Auth from './pages/User/Auth';
import { useAuth } from './reusable/hooks/auth-hook';

function App() {
  const { token, login, logout, userId } = useAuth();

  let myRoutes;
  if (token) {
    myRoutes = (
      <Routes>
        <Route exact path="/:userid/create-listing" element={<CreateListing />} />
        <Route exact path="/:userid/my-products" element={<MyProducts />} />
        <Route exact path="/products/:productId" element={<UpdateProduct />} />
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    myRoutes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <BrowserRouter>
        <MainNavigation />

        <Routes>
          <Route exact path='/' element={<Main homeImage={IMAGES.image_home}/>} />
          <Route exact path='/categories' element={<About />} />
          <Route exact path='/products' element={<Products />} />
        </Routes>
        
        <main>{myRoutes}</main>

        <Footer />
      </BrowserRouter>

    </AuthContext.Provider>
  );
}

export default App;