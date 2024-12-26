

import React, { useEffect } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../helpers/Loading';
import '../../../App'
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { searchCustomersBySysIdThunk, resetCustomer } from "./BillingSlice"; // Path to BillingSlice.js
export default function BillingOverview() {
    // Fetch customer data by ID 
    // If no data (404 response) render a card with a message and button to create a stripe customer
    // If a customer exists but no subscription, render a button that navigates to newSubscriptionForm
    // If a customer exists with a subscription, render the billing components and a button that navigates to ManageSubscription
    const dispatch = useDispatch();
    const paramsId = useParams().id;
    const stripeCustomerId = useSelector((state) => state.billing.stripeCustomerId);
    const stripeSubscriptionId = useSelector((state) => state.billing.stripeCustomerSubscription)
    const { authState, oktaAuth } = useOktaAuth();

    const accessToken = oktaAuth.getAccessToken();
    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            setAccessToken(accessToken)
            //     dispatch(searchCustomerByOktaId({ paramsId }))
            dispatch(searchCustomersBySysIdThunk({ customerId: paramsId })).then((response) => {
                console.log("Thunk Response:", response.payload);
            });
        }
        return () => {
            dispatch(resetCustomer());
        };
    }, []);

    useEffect(() => {
        console.log(stripeCustomerId);
        console.log(stripeSubscriptionId);
    }, [stripeCustomerId]);

    // return (
    //     <Card>
    //         <Card.Header>Billing Details</Card.Header>
    //         <Card.Body>
    //             <Form>
    //                 <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
    //                     <Form.Label column sm="5">
    //                         Status
    //                     </Form.Label>
    //                     <Col sm="7">
    //                         <Form.Control plaintext readOnly defaultValue={"Active"} />
    //                     </Col>
    //                 </Form.Group>
    //                 <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
    //                     <Form.Label column sm="5">
    //                         Last Bill Date
    //                     </Form.Label>
    //                     <Col sm="7">
    //                         <Form.Control plaintext readOnly defaultValue={"06/01"} />
    //                     </Col>
    //                 </Form.Group>
    //                 <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
    //                     <Form.Label column sm="5">
    //                         Active Since
    //                     </Form.Label>
    //                     <Col sm="7">
    //                         <Form.Control plaintext readOnly defaultValue={"06/01"} />
    //                     </Col>
    //                 </Form.Group>
    //             </Form>
    //         </Card.Body>
    //         <Card.Footer>
    //             <Button as={Link} to={`/students/${paramsId}/billing`} variant='darkblue'>Manage Billing</Button>
    //         </Card.Footer>
    //     </Card>
    // )
    // No resolved Stripe customer ID
    if (!stripeCustomerId) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>No Customer Found</Card.Title>
                    <Card.Text>
                        We couldn't find your customer data for the user. Please create a new Stripe customer.
                    </Card.Text>
                    <Button variant="primary" onClick={() => console.log('Create Customer Flow')}>
                        Create Customer
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    // Customer exists, no subscription
    if (stripeCustomerId && !stripeSubscriptionId) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>No Subscription</Card.Title>
                    <Card.Text>
                        {/* Customer: {customer.name} <br />
                        Email: {customer.email} <br /> */}
                        You don't have an active subscription. Start your subscription today!
                    </Card.Text>
                    <Button variant="primary" onClick={() => console.log('Start Subscription Flow')}>
                        Start Subscription
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    // Customer and subscription exist
    if (stripeCustomerId && stripeSubscriptionId) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Subscription Details</Card.Title>
                    <Card.Text>
                        {/* Customer: {customer.name} <br />
                        Email: {customer.email} <br />
                        Plan: {subscription.planName} <br />
                        Status: {subscription.status} */}
                    </Card.Text>
                    <Button variant="secondary" onClick={() => console.log('Update Payment Method')}>
                        Update Payment Method
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    return null; // Default fallback
}
