import { Card, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';

const AdBox = ({ _id, title, image, price, location }) => {
  return (
    <Card >
      <Card.Img variant="top" src={IMAGES_URL + image} />
      <Card.Body>
        <div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Location: {location}</Card.Text>
          <Card.Text>Price: {price}$</Card.Text>
        </div>
        <Row className="pt-3 pl-3">
          <Link to={'/ad/' + _id}>
            <Button variant="primary">Read more</Button>
          </Link>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AdBox;
