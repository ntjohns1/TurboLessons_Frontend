import React, { useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentMethodsByCustomerThunk, selectPaymentMethods, selectProducts, fetchAllProductsThunk, selectCustomerBySysId, updatePaymentMethodFormState } from "./BillingSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { use } from "react";

const ManagePaymentMethod = ({ paramsId }) => {

    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const dispatch = useDispatch();
    const customer = useSelector((state) => selectCustomerBySysId(state, paramsId));
    const stripeCustomerId = customer ? customer.id : "";
    const customerPaymentMethods = useSelector(selectPaymentMethods);
    const products = useSelector(selectProducts);
    const showDetails = useSelector((state) => state.billing.showPaymentModalDetails);

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchAllProductsThunk());
        }
    }, []);

    useEffect(() => {
        setAccessToken(accessToken);
        if (stripeCustomerId) {
            dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId }));
        }
    }, [dispatch, stripeCustomerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updatePaymentMethodFormState({ field: name, value }));
    };

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