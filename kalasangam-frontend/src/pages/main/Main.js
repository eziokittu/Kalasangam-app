import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

export default function Main(props) {
  return (
    <>
      <main className="main">
        {/* <!--==================== HOME ====================--> */}
        <section className="home section" id="home">
           <img src={props.homeImage} alt="home" className="home__bg"/>
           <div className="home__shadow"></div> 
           
           <div className="home__container containter grid">
               <div className="home__data">
                   <h3 className="home__subtitle">
                       <i className="ri-leaf-fill"></i>KalaSangam
                   </h3>
                   <h1 className="home__title">
                       Explore<br/>
                       The World of Hand made Items
                   </h1>
                   <p className="home_description">
                       Discover a wide range of exqusite handicrafted items at KalaSangam's commerce store. Find the perfect piece to elevate your style.
                   </p>
                   
                   <Link to="/products" className="button">
                    Happy Shopping <i className="ri-arrow-right-line"></i>
                   </Link>
               </div>
            </div>
       </section>

         {/* <!--==================== ABOUT ====================--> */}
         <section className="about section" id="about">
            
         </section>

         {/* <!--==================== PRODUCTS ====================--> */}
         <section className="popular section" id="popular">
            
         </section>
         
         {/* <!--==================== EXPLORE ====================--> */}
         <section className="explore section" id="explore">
            
         </section>
         
         {/* <!--==================== JOIN ====================--> */}
         <section className="join section">
            
         </section>
      </main>
    </>
  )
}
