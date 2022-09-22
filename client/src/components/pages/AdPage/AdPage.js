import { Card, Row, Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';
import DeleteAd from '../../features/DeleteAd/DeleteAd';
import { getAdById, removeAdById, fetchAds } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/userRedux';
import { useSelector, useDispatch } from 'react-redux';

const AdPage = () => {
  const user = useSelector(getUser);
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));

  console.log('adData: ', adData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeAdById(id));
    handleClose();
  };

  if (showModal)
    return (
      <DeleteAd
        showModal={showModal}
        handleClose={handleClose}
        handleRemove={handleRemove}
      />
    );

  if (!adData) return <Navigate to="/" />;

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={12} lg="5">
        <Card>
          <Card.Img variant="top" src={IMAGES_URL + adData.image} />
          <Card.Body>
            <div>
              <Card.Title>{adData.title}</Card.Title>
              <Card.Text>Username: {adData.userName}</Card.Text>
              <Card.Text>Description: {adData.description}</Card.Text>
              <Card.Text>Image: {adData.image}</Card.Text>
              <Card.Text>Date: {adData.date}</Card.Text>
              <Card.Text>Price: {adData.price}$</Card.Text>
              <Card.Text>Location: {adData.location}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} lg="2">
        {user && (
          <Link to={'/ad/edit/' + adData._id}>
            <Button variant="outline-info" className="m-2">
              Edit
            </Button>{' '}
          </Link>
        )}
        {user && (
          <Button variant="outline-danger" onClick={handleShow}>
            Delete
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default AdPage;
