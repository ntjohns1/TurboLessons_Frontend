import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createSetupIntentThunk, attachPaymentMethodThunk, setSuccessMessage } from "./PaymentsSlice";

export default function CreatePaymentMethod() {
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();
  const stripe = useStripe();
  const elements = useElements();
  const error = useSelector((state) => state.payments.error);
  const loading = useSelector((state) => state.payments.loading);
  const successMessage = useSelector((state) => state.payments.successMessage);
  const customerAdapter = useSelector((state) => state.payments.entities["customer"]);
  const stripeCustomerId = useSelector((state) => state.payments.customerId);

  useEffect(() => {
    console.log(customerAdapter.entities[stripeCustomerId]?.name);
  },[customerAdapter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "payments/setError", payload: null });
    dispatch({ type: "payments/setLoading", payload: true });
    dispatch({ type: "payments/setSuccessMessage", payload: "" });

    if (!stripe || !elements) {
      console.error("Stripe.js is not initialized.");
      dispatch({ type: "payments/setError", payload: "Stripe.js has not loaded yet." });
      dispatch({ type: "payments/setLoading", payload: false });
      return;
    }
    try {

      // Create a SetupIntent
      const { clientSecret } = await dispatch(
        createSetupIntentThunk({ customerId: stripeCustomerId })
      ).unwrap();

      // Confirm the SetupIntent
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card details are missing.");
      }
      const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerAdapter.entities[stripeCustomerId]?.name,
          },
        },
      });
      if (error) {
        console.error("SetupIntent confirmation error:", error.message);
        throw new Error(error.message);
      }

      // Attach the payment method to the customer
      await dispatch(
        attachPaymentMethodThunk({
          id: setupIntent.payment_method,
          customerId: stripeCustomerId,
        })
      );
      dispatch(setSuccessMessage("Payment method saved successfully."));
    } catch (err) {
      console.error("Error in handleSubmit:", err.message);
      dispatch({ type: "payments/setError", payload: err.message });
    } finally {
      dispatch({ type: "payments/setLoading", payload: false });
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Add New Payment Method</Card.Title>
      </Card.Header>
      {successMessage ? (
        <Card.Body>
          <Alert variant="success">{successMessage}</Alert>
        </Card.Body>
      ) : (
        <>
          <Card.Body>
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
        </>
      )}
    </Card>
  );
}
