import React from "react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";

const ManageSubscription = () => {
  return (
    <Container >
      <Row >
        <Col md={12}>
          <Card className="mb-3">
            <Row>
              <Col md={6}>
                <Card className="m-3">
                  <Card.Body>
                    <Card.Title>Subscription Details</Card.Title>
                    <Card.Text>Status: Active</Card.Text>
                    <Card.Text>Plan: Monthly - $60</Card.Text>
                    <Card.Text>Renewal Date: 01/07/2024</Card.Text>
                  </Card.Body>
                </Card>
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
              <Button variant="primary">Add New Payment Method</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageSubscription;