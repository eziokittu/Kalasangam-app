import './App.css';
import IMAGES from './images/images.js'
import { 
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import About from './components/main/About';
import React from 'react';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Main homeImage={IMAGES.image_home}/>} />
        <Route exact path='/about' element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
