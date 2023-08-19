import React from 'react';
import './ProductDisplayCard.css'

function ProductDisplayCard({ title, description, imageUrl }) {
  return (
    <article className="product">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p className='description'>{description}</p>
    </article>
  );
}

export default ProductDisplayCard;