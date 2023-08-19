
import ProductDisplayCard from'../../reusable/components/ProductDisplayCard';
import './Products.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

import React from 'react'

export default function Products() {
  return (
    <main>
				<h1 className='insideBody'>Shop Our Products</h1>
        <section className="products">
            {/* <article className="product">
                <img src="product1.jpg" alt="Product 1"/>
                <h2>Product 1</h2>
                <p className="price">$19.99</p>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className="add-to-cart">Learn more</button>
            </article> */}
            <ProductDisplayCard>
              image=''
              title='old jewellery'
              price='19.99$'
              description="The is an old form of jewellry"
            </ProductDisplayCard>
            
            {/* <!-- Add more product articles here --> */}
        </section>
    </main>
  )
}
