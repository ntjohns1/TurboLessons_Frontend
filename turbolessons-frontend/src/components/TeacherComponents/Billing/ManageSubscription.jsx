import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SubscriptionDetails from "./SubscriptionDetails";
import { fetchOneSubscriptionThunk, fetchAllMetersThunk } from "./BillingSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import ManagePaymentMethod from "./ManagePaymentMethod";
import InvoiceHistory from "./InvoiceHistory";



const ManageSubscription = () => {
  /*
      High Level Process:
      


      - Requirements:
          - Viewing current subscription status and details.
          - Updating subscription plans.
          - Viewing billing history.
          - Adding or updating payment methods.
          - Handling payment processing and errors.

      
  */

  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const dispatch = useDispatch();
  const paramsId = useParams().id;
  const customerAdapter = useSelector((state) => state.billing.entities["customers"]);
  const subscriptionAdapter = useSelector((state) => state.billing.entities["subscriptions"]);
  const customer = Object.values(customerAdapter.entities).find(
    (c) => c.metadata?.okta_id === paramsId
  );
  const stripeCustomerId = customer ? customer.id : "";
  // Todo: This should handle multiple subscriptions
  const stripeSubscriptionId = customer ? customer.subscriptions[0] : "";
  const subscription = Object.values(subscriptionAdapter.entities).find((s) => s.id === stripeSubscriptionId);
  const meters = useSelector((state) => state.billing.entities["meters"]);


  useEffect(() => {
    dispatch(fetchAllMetersThunk());
  }, []);

  useEffect(() => {
    console.log("meters:" + JSON.stringify(meters));
  }, [meters]);

  useEffect(() => {
    const customer = Object.values(customerAdapter.entities).find(
      (c) => c.metadata?.okta_id === paramsId
    );
    console.log("customer", customer);

    // console.log("subscriptions", customer?.subscriptions);

    setAccessToken(accessToken);
    if (stripeSubscriptionId) {
      dispatch(fetchOneSubscriptionThunk(stripeSubscriptionId))
      .then((response) => {
        console.log("Thunk Response:", response.payload);
      });
    }

  }, [customerAdapter]);

  return (
    <Container >
      <Row >
        <Col md={12}>
          <Card className="mb-3">
            <Row>
              <Col md={6}>
                <SubscriptionDetails subscription={subscription} />
              </Col>
              <Col md={6}>
                <Card className="m-3">
                  <Card.Body>
                    <Card.Title className="text-center">Update Subscription Plan</Card.Title>
                    <Form>
                      <Form.Group controlId="subscriptionPlan" className="text-center">
                        <Form.Label>Choose a new plan</Form.Label>
                        <Form.Control as="select">
                          <option className="text-center">Monthly - $60</option>
                          <option className="text-center">Quarterly - $50</option>
                          <option className="text-center">Yearly - $180</option>
                        </Form.Control>
                      </Form.Group>
                      <div className="mt-3 text-center">
                        <Button variant="primary" type="submit">Update Plan</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card>
          <InvoiceHistory />
          <ManagePaymentMethod paramsId={paramsId} />
        </Col>
      </Row>
    </Container>
  );
};

export default ManageSubscription;