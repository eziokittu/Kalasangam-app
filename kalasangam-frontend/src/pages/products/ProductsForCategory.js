import './Products.css';
import '../../reusable/reusable.css';

import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import { useParams } from 'react-router-dom';

function ProductsForCategory() {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const categoryName = useParams().name;

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        console.log("DEBUG -- ProductsForCategory.s -- 1: "+categoryName);
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/categories/${categoryName}`
        );
        console.log("DEBUG -- ProductsForCategory.s -- 2: ");
        setLoadedProducts(responseData.products);
        console.log("DEBUG -- ProductsForCategory.s -- 3: ");
      } catch (err) {
        console.log("Error in fetching products: "+err);
      }
    };
    fetchproducts();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && (
        <ProductList items={loadedProducts} />
      )}
    </React.Fragment>
  );
}

export default ProductsForCategory;