import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentMethodModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const error = useSelector((state) => state.billing.error);
  const loading = useSelector((state) => state.billing.loading);






  return (
    <>
      <Card
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Card.Header closeButton>
          <Card.Title>New Payment Method</Card.Title>
        </Card.Header>
        <Card.Body>

        </Card.Body>
        <Card.Footer className='m-2'>
          <Button variant="info">Submit</Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}
