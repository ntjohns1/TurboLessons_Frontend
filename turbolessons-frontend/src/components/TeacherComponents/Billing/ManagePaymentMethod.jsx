import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useGetPaymentMethodsByCustomerQuery } from "../../../service/billingApi";

const ManagePaymentMethod = ({ stripeCustomerId }) => {
    const { data: customerPaymentMethods = [] } = useGetPaymentMethodsByCustomerQuery(
        stripeCustomerId,
        { skip: !stripeCustomerId }
    );
    const [selected, setSelected] = useState("");

    const handleChange = (e) => setSelected(e.target.value);

    return (
        <Card className="m-2">
            <Card.Body>
                <h3>Payment Methods</h3>
                <Form>
                    <Form.Group as={Row} controlId="paymentMethod">
                        <Form.Label column sm="2">Payment Method</Form.Label>
                        <Col sm="10">
                            <Form.Control as="select" name="paymentMethod" value={selected} onChange={handleChange}>
                                <option value="">Select Payment Method</option>
                                {customerPaymentMethods.map((method) => (
                                    <option key={method.id} value={method.id}>
                                        {method.card.brand} **** **** **** {method.card.last4}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Button type="submit" variant="primary">Update Payment Method</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
export default ManagePaymentMethod;
