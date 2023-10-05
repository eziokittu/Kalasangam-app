import './App.css';
import IMAGES from './storedData/images'
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
import Categories from './pages/categories/Categories';
import Products from './pages/products/Products';
import MyProducts from './pages/myProducts/MyProducts';
import UpdateProduct from './pages/myProducts/UpdateProduct';
import CreateListing from './pages/createListing/CreateListing';
import AddCategory from './pages/categories/AddCategory';
import UpdateCategory from './pages/categories/UpdateCategory';
import { AuthContext } from './reusable/context/auth-context';
import Auth from './pages/User/Auth';
import Admin from './pages/User/Admin';
import { useAuth } from './reusable/hooks/auth-hook';

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();


  let myRoutes;
  if (token) {
    myRoutes = (
      <Routes>
        <Route exact path="/:userid/create-listing" element={<CreateListing />} />
        <Route exact path="/:userid/my-products" element={<MyProducts />} />
        <Route exact path="/products/:productId" element={<UpdateProduct />} />
        <Route exact path="/" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        isAdmin: isAdmin,
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
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/update-category/:cid" element={<UpdateCategory />} />
          <Route exact path="/admin/create-category" element={<AddCategory />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
        
        <main>{myRoutes}</main>

        <Footer />
      </BrowserRouter>

    </AuthContext.Provider>
  );
}

export default App;