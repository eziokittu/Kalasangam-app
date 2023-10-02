import React from 'react';

import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

import CategoryItem from './CategoryItem';
import './CategoryList.css';

const CategoryList = props => {
  if (props.items.length === 0) {
    return (
      <div className="category-list center">
        <Card>
          <h2>No categories found</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <CardGroup className='category-card-group'>
        {props.items.map(category => (
          <CategoryItem
            image={category.image}
            name={category.name}
          />
        ))}
      </CardGroup>
    </React.Fragment>
  );
};

export default CategoryList;
