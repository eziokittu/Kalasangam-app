import React from 'react';

import Card from '../../reusable/UIElements/Card';
import ProductItem from './ProductItem';
import Button from '../../reusable/FormElements/Button';
import './ProductItem.css';

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
    <ul className="product-list">
      {props.items.map(product => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          creatorId={product.creator}
          onDelete={props.onDeleteproduct}
        />
      ))}
    </ul>
  );
};

export default ProductList;
