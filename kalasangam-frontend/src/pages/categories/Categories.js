import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import categoryImages from '../../storedData/categories';

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
          `http://localhost:5000/api/categories/get-categories`
        );
        setLoadedCategories(responseData.categories);
      } catch (err) {
        console.log("Error in fetching categories: "+err);
      }
    };
    fetchCategories();
  }, [sendRequest]);

  const navigate = useNavigate();

  return (
    <React.Fragment >
      <div className='insideBody'> 
        <h3 className='center'>Choose a category below to browse the products</h3>
      </div>

      <br/>

      <div className='text-center'> 
        <button className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-rose-200 active:bg-teal-600 font-bold text-lg px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onc onClick={()=>{navigate('/products')}}>
          Browse Products From All Categories
        </button>
      </div>

      <div className='center'>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedCategories && (
          <CategoryList items={loadedCategories} />
        )}
      </div>
      
    </React.Fragment>
  );
}

export default Categories;