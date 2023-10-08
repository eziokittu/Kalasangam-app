import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Modal from '../../reusable/UIElements/Modal';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { AuthContext } from '../../reusable/context/auth-context';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import './CategoryItem.css';

const CategoryItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      console.log("test 1: props.id="+props.id);
      await sendRequest(
        `http://localhost:5000/api/categories/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      console.log("test 2");
      // props.onDelete(props.id);
    } catch (err) {
      console.log("Could not delete category: "+err);
    }
  };

  const showProductsHandler = async () => {
    let selectedCategory;

    // getting the category name for the selected category
    try {
      console.log("test 1: props.id="+props.id);
      selectedCategory = await sendRequest(
        `http://localhost:5000/api/categories/get-categories/${props.id}`,
        'GET',
        null,
        {}
      );
      console.log("test 2: "+selectedCategory.category.name);
      // props.onDelete(props.id);
    } catch (err) {
      console.log("Could not delete category: "+err);
    }

    navigate(`${selectedCategory.category.name}`);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this category?
          Please note that it can't be undone thereafter.
        </p>
      </Modal>

      <Card className="category-card">
        {isLoading && <LoadingSpinner asOverlay />}

        <Card.Img variant="top" src={`http://localhost:5000/${props.image}`} />
        {/* <Card.Img variant="top" src={`${props.image}`} /> */}
        <Card.Body>
          <Card.Title className='name'>{props.name}</Card.Title>
        </Card.Body>

        <div className="card-links">
          {auth.isLoggedIn && auth.isAdmin && (
            <Link to={`/admin/update-category/${props.id}`}>
              <Button>EDIT</Button>
            </Link>
          )}
          {auth.isLoggedIn && auth.isAdmin && (
            <Link>
              <Button onClick={showDeleteWarningHandler}>DELETE</Button>
            </Link>
          )}
          <Link>
            <Button onClick={showProductsHandler}>Show Products</Button>
          </Link>
        </div>

      </Card>
    </React.Fragment>
  );
};

export default CategoryItem;
