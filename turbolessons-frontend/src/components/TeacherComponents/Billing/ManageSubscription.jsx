import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PaymentMethodModal from "./CreatePaymentMethod";
import SubscriptionDetails from "./SubscriptionDetails";
import { createCustomerThunk, searchCustomersBySysIdThunk, fetchOneSubscriptionThunk } from "./BillingSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { use } from "react";


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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const dispatch = useDispatch();
  const paramsId = useParams().id;
  const customerAdapter = useSelector((state) => state.billing.entities["customers"]);
  const customer = Object.values(customerAdapter.entities).find(
    (c) => c.metadata?.okta_id === paramsId
  );
  const stripeCustomerId = customer ? customer.id : "";
  // Todo: This should handle multiple subscriptions
  const stripeSubscriptionId = customer ? customer.subscriptions[0] : "";

  useEffect(() => {

  }, [customerAdapter]);

  useEffect(() => {
    const customer = Object.values(customerAdapter.entities).find(
      (c) => c.metadata?.okta_id === paramsId
    );
    console.log("customer", customer);

    console.log("subscriptions", customer?.subscriptions);

    setAccessToken(accessToken);
    if (stripeSubscriptionId) {

      dispatch(fetchOneSubscriptionThunk(stripeSubscriptionId)).then((response) => {
        console.log("Thunk Response:", response.payload); // Log the response from the thunk
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
                <SubscriptionDetails />
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
          <Card className="mb-3">
            <Card.Body>
              <h3>Billing History</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01/06/2024</td>
                    <td>$60</td>
                    <td>Paid</td>
                  </tr>
                  <tr>
                    <td>01/05/2024</td>
                    <td>$60</td>
                    <td>Paid</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h3>Payment Methods</h3>
              <p>Current Method: **** **** **** 1234</p>
              <Button variant="primary" onClick={handleShow}>Manage Payment Methods</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageSubscription;