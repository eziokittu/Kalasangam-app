import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Modal from '../../reusable/UIElements/Modal';
import ErrorModal from '../../reusable/UIElements/ErrorModal';
import LoadingSpinner from '../../reusable/UIElements/LoadingSpinner';
import { AuthContext } from '../../reusable/context/auth-context';
import { useHttpClient } from '../../reusable/hooks/http-hook';
import './ProductItem.css';

const ProductItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/products/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

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
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      <Card className="custom-card">
        {isLoading && <LoadingSpinner asOverlay />}

        <Card.Img variant="top" src={`http://localhost:5000/${props.image}`} />

        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>

        <div className="card-links">
          {/* <link to='https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page'>Website</link> */}
          <button onClick={()=>{window.open(`${props.website}`, '_blank')}}>Website</button>
          <button onClick={()=>{window.open(`${props.instagram}`, '_blank')}}>Instagram</button>
          <button onClick={()=>{window.open(`${props.facebook}`, '_blank')}}>Facebook</button>
          <button onClick={()=>{window.open(`${props.twitter}`, '_blank')}}>Twitter</button>
        </div>

        {auth.userId === props.creatorId && (
          <div className="card-links">
            <Link to={`/products/${props.id}`}>
              <Button>EDIT</Button>
            </Link>
            <Link>
              <Button onClick={showDeleteWarningHandler}>DELETE</Button>
            </Link>
          </div>
        )}

      </Card>
    </React.Fragment>
  );
};

export default ProductItem;
