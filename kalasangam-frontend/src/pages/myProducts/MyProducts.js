import './MyProducts.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductList from '../products/ProductList';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook';

function MyProducts() {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams();
	console.log("DEBUG -- MyProducts.js -- working 1: userId = "+userId);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/user/${userId}`
        );
        setLoadedProducts(responseData.products);
      } catch (err) {
        console.log("Error in fetching products: "+err);
      }
    };
    fetchproducts();
  }, [sendRequest, userId]);

	const productDeletedHandler = deletedProductId => {
    setLoadedProducts(prevProducts =>
      prevProducts.filter(product => product.id !== deletedProductId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && (
        <ProductList items={loadedProducts} onDeleteProduct={productDeletedHandler} />
      )}
    </React.Fragment>
  );
}

export default MyProducts;