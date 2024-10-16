import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PaymentMethodModal from "./PaymentMethodModal";
import { listAllProducts, listAllPrices, getPrice } from '../../../service/billingService';
import SubscriptionDetails from "./SubscriptiopnDetails";
import { createCustomerThunk } from "./BillingSlice";

const ManageSubscription = () => {

  // pseudocode:

  // fetch stripe customer using Student ID TODO
  const id = useParams().id;
  // if no stripe customer account attached to student data, render component to create Stripe account
  // if customer account exists but no subscription, render form to create subscription
  // if subscription exists, render data in UI Layout below:

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const testGetProducts = async () => {
    const response = await listAllProducts();
    console.log(response.data);
    return response;
  };



  useEffect(() => {
    const test = testGetProducts();
  }, []);

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
                      <PaymentMethodModal show={show} handleClose={handleClose} />
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