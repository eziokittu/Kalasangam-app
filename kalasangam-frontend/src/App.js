import './App.css';
import IMAGES from './images/images.js'
import { 
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom';

import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import Main from './pages/main/Main';
import About from './pages/about/About';
import Products from './pages/products/Products';
import CreateListing from './pages/createListing/CreateListing';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Header
        appname='KalaSangam'
        names={['Home', 'Categories', 'Products', 'Create Listing']} 
      />
      <Routes>
        <Route exact path='/' element={<Main homeImage={IMAGES.image_home}/>} />
        <Route exact path='/categories' element={<About />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/create-listing' element={<CreateListing />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;