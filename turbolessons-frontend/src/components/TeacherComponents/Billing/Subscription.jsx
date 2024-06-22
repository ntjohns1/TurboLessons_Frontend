import React from "react";
import { Container, Row, Col, Table, Form, Button, Card, Alert } from "react-bootstrap";

const Subscription = () => {
  return (
    <Container>
      <Card className='d-flex justify-content-center'>
      <Row>
        <Col>
          <h3>Subscription Details</h3>
          <p>Status: Active</p>
          <p>Plan: Monthly - $20</p>
          <p>Renewal Date: 01/07/2024</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Update Subscription Plan</h3>
          <Form>
            <Form.Group controlId="subscriptionPlan">
              <Form.Label>Choose a new plan</Form.Label>
              <Form.Control as="select">
                <option>Monthly - $20</option>
                <option>Quarterly - $50</option>
                <option>Yearly - $180</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Update Plan</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
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
                <td>$20</td>
                <td>Paid</td>
              </tr>
              <tr>
                <td>01/05/2024</td>
                <td>$20</td>
                <td>Paid</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Payment Methods</h3>
          <p>Current Method: **** **** **** 1234</p>
          <Button variant="primary">Add New Payment Method</Button>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <Alert variant="danger">
            Payment processing error: Your card was declined.
          </Alert>
        </Col>
      </Row> */}
      </Card>
    </Container>
  );
};

export default Subscription;