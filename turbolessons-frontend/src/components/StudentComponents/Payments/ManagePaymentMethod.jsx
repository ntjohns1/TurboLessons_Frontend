import React from "react";
import { Card } from "react-bootstrap";

const ManagePaymentMethod = ({ stripeCustomerId }) => {

    const showDetails = false;
    const customerPaymentMethods = [];

    return (
        <Card className="m-2">
            {showDetails ?
                (<Card.Body>
                    <h3>Payment Methods</h3>
                    <p>Current Method: **** **** **** 1234</p>
                    <Button variant="primary">Manage Payment Methods</Button>
                </Card.Body>
                ) : (
                    <Card.Body>
                        <h3>Payment Methods</h3>
                        <Form>
                            <Form.Group as={Row} controlId="paymentMethod">
                                <Form.Label column sm="2">Payment Method</Form.Label>
                                <Col sm="10">
                                    <Form.Control as="select" name="paymentMethod" onChange={handleChange}>
                                        <option value="">Select Payment Method</option>
                                        {customerPaymentMethods.map((method) => (
                                            <option key={method.id} value={method.id}>{method.card.brand} **** **** **** {method.card.last4}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Button type="submit" variant="primary">Update Payment Method</Button>
                        </Form>
                    </Card.Body>
                )}
        </Card>
    );
}
export default ManagePaymentMethod;