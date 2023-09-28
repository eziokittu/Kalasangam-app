import React from 'react';

import Card from '../../reusable/UIElements/Card';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import './ProductItem.css';

const ProductItem = props => {
  const { isLoading, error, clearError } = useHttpClient();
  console.log("DEBUG - ProductItem.js -- "+props.image);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="product-item">
        <Card className="product-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="product-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="product-item__info">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProductItem;
