import { Button, Modal } from 'react-bootstrap';
import NewSubscriptionForm from './NewSubscriptionForm';


export default function PaymentMethodModal({show, handleClose}) {
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <NewSubscriptionForm />
        </Modal.Body>
        <Modal.Footer className='m-2'>
          <Button variant="info">Submit</Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
