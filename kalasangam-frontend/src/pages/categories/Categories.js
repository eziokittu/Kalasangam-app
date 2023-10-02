import React from 'react'
import categoryImages from '../../storedData/categories';

import CategoryList from './CategoryList';
// import ErrorModal from '../../reusable/UIElements/ErrorModal';
// import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
// import { useHttpClient } from '../../reusable/hooks/http-hook'

import './Categories.css';
import '../../reusable/reusable.css'; // Adjust the path based on your structure

function Categories() {
  // const [loadedCategories, setLoadedCategories] = useState();
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:5000/api/categories/`
  //       );
  //       setLoadedCategories(responseData.categories);
  //     } catch (err) {
  //       console.log("Error in fetching categories: "+err);
  //     }
  //   };
  //   fetchCategories();
  // }, [sendRequest]);

  // hardcoded categores for now until ADMIN page is maintained
  let myCategories = [
    {
      "name" : "Category 1",
      "image" : `${categoryImages.category1}`
    },
    {
      "name" : "Category 2",
      "image" : `${categoryImages.category2}`
    },
    {
      "name" : "Category 3",
      "image" : `${categoryImages.category3}`
    },
    {
      "name" : "Category 4",
      "image" : `${categoryImages.category4}`
    },
    {
      "name" : "Category 5",
      "image" : `${categoryImages.category5}`
    },
    {
      "name" : "Category 6",
      "image" : `${categoryImages.category6}`
    },
    {
      "name" : "Category 7",
      "image" : `${categoryImages.category7}`
    },
    {
      "name" : "Category 8",
      "image" : `${categoryImages.category8}`
    },
    {
      "name" : "Category 9",
      "image" : `${categoryImages.category9}`
    },
    {
      "name" : "Category 10",
      "image" : `${categoryImages.category10}`
    },
  ];

  return (
    <React.Fragment >
      <div className='insideBody'> 
        <h3 className='center'>Choose a category below to browse the products</h3>
      </div>
      {/* <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCategories && (
        <CategoryList items={loadedCategories} />
      )} */}
      <div className='center'><CategoryList items={myCategories}/></div>
      
    </React.Fragment>
  );
}

export default Categories;