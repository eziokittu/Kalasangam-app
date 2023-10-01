import React, { useState, useEffect } from 'react'

import CategoryList from './CategoryList';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook'

import './Categories.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

function Categories() {
  const [loadedCategories, setLoadedCategories] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/categories/`
        );
        setLoadedCategories(responseData.categories);
      } catch (err) {
        console.log("Error in fetching categories: "+err);
      }
    };
    fetchCategories();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className='insideBody'> 
        <h3 className='center'>Choose a category below to browse the products</h3>
      </div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCategories && (
        <CategoryList items={loadedCategories} />
      )}
    </React.Fragment>
  );
}

export default Categories;