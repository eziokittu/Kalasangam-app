import './Products.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

// import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
// import Pagination from '../../reusable/Pagination/Pagination';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook';

function Products() {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/`
        );
        setLoadedProducts(responseData.products);
      } catch (err) {
        console.log("Error in fetching products: "+err);
      }
    };
    fetchproducts();
  }, [sendRequest]);

  return (
    <div className='center insideBody'>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
          <h3>Loading products...</h3>
        </div>
      )}
      
      {!isLoading && loadedProducts && (
        <ProductList items={loadedProducts} />
      )}
      {/* <Pagination /> */}
    </div>
  );
}

export default Products;