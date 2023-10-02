import React from 'react';
import Card from 'react-bootstrap/Card';

import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import './CategoryItem.css';

const CategoryItem = props => {
  const { isLoading, error, clearError } = useHttpClient();

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Card className="category-card">
        {isLoading && <LoadingSpinner asOverlay />}

        {/* <Card.Img variant="top" src={`http://localhost:5000/${props.image}`} /> */}
        <Card.Img variant="top" src={`${props.image}`} />
        <Card.Body>
          <Card.Title className='name'>{props.name}</Card.Title>
        </Card.Body>

      </Card>
    </React.Fragment>
  );
};

export default CategoryItem;
