

import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import '../../../App'
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { searchCustomersBySysIdThunk, fetchPaymentMethodsByCustomerThunk } from "./BillingSlice";

export default function BillingOverview() {

    const dispatch = useDispatch();
    const paramsId = useParams().id;
    const { authState, oktaAuth } = useOktaAuth();

    const customerAdapter = useSelector((state) => state.billing.entities["customers"]);
    const customer = Object.values(customerAdapter.entities).find(
        (c) => c.metadata?.okta_id === paramsId
    );

    const stripeCustomerId = customer ? customer.id : "";

    // Todo: This should handle multiple subscriptions
    const stripeSubscriptionId = customer ? customer.subscriptions[0] : "";

    const accessToken = oktaAuth.getAccessToken();
    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            setAccessToken(accessToken)
            dispatch(searchCustomersBySysIdThunk({ customerId: paramsId }));
        }
    }, []);

    // No resolved Stripe customer ID
    if (!stripeCustomerId) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>No Customer Found</Card.Title>
                    <Card.Text>
                        We couldn't find your customer data for the user. Please create a new Stripe customer.
                    </Card.Text>
                    <Button as={Link} to={`/students/${paramsId}/create_stripe_account`} variant="primary">
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
                    <Button as={Link} to={`/students/${paramsId}/create_subscription`} variant="primary">
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
                    <Button variant="secondary" onClick={() => console.log(dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId })))}>
                        Update Payment Method
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    return null; // Default fallback
}
