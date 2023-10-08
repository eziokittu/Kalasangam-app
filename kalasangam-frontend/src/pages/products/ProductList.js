import React from 'react';

import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

import ProductItem from './ProductItem';
import './ProductList.css';

const ProductList = props => {
  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No products found. Maybe create one?</h2>
          {/* <Button to="/products/new">Share product</Button> */}
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <CardGroup className='custom-card-group'>
        {props.items.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            creatorId={product.creator}

            facebook={product.facebook}
            instagram={product.instagram}
            twitter={product.twitter}
            website={product.website}
            // onDelete={props.onDeleteproduct}
          />
        ))}
      </CardGroup>
    </React.Fragment>
  );
};

export default ProductList;
