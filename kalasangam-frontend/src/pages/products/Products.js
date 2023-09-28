import ProductDisplayCard from'./ProductDisplayCard';
import './Products.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      // Extract the 'products' array from the response data
      const { products } = response.data;
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  return (
    <div className="insideBody">
      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <ProductDisplayCard
            key={product._id}
            title={product.title}
            description={product.description}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;