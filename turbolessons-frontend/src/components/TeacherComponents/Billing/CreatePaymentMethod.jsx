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
  const successMessage = useSelector((state) => state.billing.successMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "billing/setError", payload: null });
    dispatch({ type: "billing/setLoading", payload: true });
    dispatch({ type: "billing/setSuccessMessage", payload: "" })
    if (!stripe || !elements) {
      dispatch({ type: "billing/setError", payload: "Stripe.js has not loaded yet." });
      dispatch({ type: "billing/setLoading", payload: false });
      return;
    }

    try {
      // Step 1: Create a SetupIntent
      const { clientSecret } = await dispatch(createSetupIntentThunk({ customerId })).unwrap();

      // Step 2: Confirm the SetupIntent with Stripe.js
      const cardElement = elements.getElement(CardElement);

      const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer Name", // Optional: Replace with dynamic data if available
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Step 3: Success - Display a success message and optionally reset the form
      dispatch({ type: "billing/setSuccessMessage", payload: "Payment method saved successfully" })
    } catch (err) {
      dispatch({ type: "billing/setError", payload: err.message });
    } finally {
      dispatch({ type: "billing/setLoading", payload: false });
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Add New Payment Method</Card.Title>
      </Card.Header>
      <Card.Body>
        {successMessage ? (
          <Alert variant="success">{successMessage}</Alert>
        ) : (
          <>
            <Alert variant="info">
              Enter your payment details below to save them for future billing.
            </Alert>
            <div className="my-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
          </>
        )}
      </Card.Body>
      <Card.Footer>
        <Button
          variant="info"
          onClick={handleSubmit}
          disabled={loading || successMessage}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </Card.Footer>
    </Card>
  );
}
