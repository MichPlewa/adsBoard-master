import { Modal, Button } from 'react-bootstrap';

const DeleteAd = (props) => {
  return (
    <Modal show={props.showModal} handleClose={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This operation will completely remove this post from the app. <br></br>
        Are you sure you want to do that?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.handleRemove}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAd;
