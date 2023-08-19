import React from 'react';

function ProductDisplayCard({ title, description, imageUrl }) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ProductDisplayCard;