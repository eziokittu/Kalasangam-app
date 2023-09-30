import React from 'react';

import Card from 'react-bootstrap/Card';

// import Card from '../../reusable/UIElements/Card';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import './ProductItem.css';

const ProductItem = props => {
  const { isLoading, error, clearError } = useHttpClient();
  // console.log("DEBUG - ProductItem.js -- "+props.image);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* <li className="product-item">
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
      </li> */}
      <Card className="custom-card">
        {props.isLoading && <LoadingSpinner asOverlay />}
        <Card.Img variant="top" src={`http://localhost:5000/${props.image}`} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
        <div className="card-links">
          <Card.Link href='#'>Website</Card.Link>
          <Card.Link href='#'>Instagram</Card.Link>
          <Card.Link href='#'>Facebook</Card.Link>
        </div>
        <div className="card-links">
<<<<<<< HEAD
          <Link to={`/products/${props.id}`}>
            <Button>EDIT</Button>
          </Link>
          <Link>
            <Button onClick={showDeleteWarningHandler}>DELETE</Button>
          </Link>
=======
          <Card.Link>Edit Product</Card.Link>
          <Card.Link>Delete Product</Card.Link>
>>>>>>> parent of 524bc46 (Delete button works)
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ProductItem;
