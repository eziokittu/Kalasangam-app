import './App.css';
import IMAGES from './storedData/images'
import { 
  BrowserRouter,
  Routes, 
  Navigate,
  Route,
} from 'react-router-dom';
import React, { useContext, useState } from 'react';

import MainNavigation from './reusable/Navigation/MainNavigation';
import Footer from './shared/footer/Footer';
import Main from './pages/main/Main';
import Categories from './pages/categories/Categories';
import Products from './pages/products/Products';
import MyProducts from './pages/myProducts/MyProducts';
import UpdateProduct from './pages/myProducts/UpdateProduct';
import CreateListing from './pages/createListing/CreateListing';
import AddCategory from './pages/categories/AddCategory';
import { AuthContext } from './reusable/context/auth-context';
import Auth from './pages/User/Auth';
import Admin from './pages/User/Admin';
import { useAuth } from './reusable/hooks/auth-hook';

function App() {
  const { token, login, logout, userId } = useAuth();
  const auth = useContext(AuthContext);

  let myRoutes;
  if (token && auth.isAdmin){
    myRoutes = (
      <Routes>
        <Route exact path="/products/:productId" element={<UpdateProduct />} />
        <Route exact path="/admin/create-category" element={<AddCategory />} />
      </Routes>
    );
  } else if (token) {
    myRoutes = (
      <Routes>
        <Route exact path="/:userid/create-listing" element={<CreateListing />} />
        <Route exact path="/:userid/my-products" element={<MyProducts />} />
        <Route exact path="/products/:productId" element={<UpdateProduct />} />
        <Route exact path="/" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    myRoutes = (
      <Routes>
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        isAdmin: false,
        login: login,
        logout: logout
      }}
    >
      <BrowserRouter>
        <MainNavigation />

        <Routes>
          {/* <Route exact path='/' element={<MainNavigation/>} /> */}
          <Route exact path='/' element={<Main homeImage={IMAGES.image_home}/>} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/products' element={<Products />} />
        </Routes>
        
        <main>{myRoutes}</main>

        <Footer />
      </BrowserRouter>

    </AuthContext.Provider>
  );
}

export default App;