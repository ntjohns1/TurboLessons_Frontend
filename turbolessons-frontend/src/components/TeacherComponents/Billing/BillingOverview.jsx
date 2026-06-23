import React from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../../../App'
import useBillingData from './useBillingData';

export default function BillingOverview() {
    const paramsId = useParams().id;
    const { hasCustomer, hasSubscription, isLoading } = useBillingData(paramsId);

    if (isLoading) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Loading...</Card.Title>
                    <Button disabled variant="secondary">
                        <Spinner animation="grow" size="sm" />
                        <Spinner animation="grow" size="sm" />
                        <Spinner animation="grow" size="sm" />
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    // No Stripe customer yet
    if (!hasCustomer) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>No Customer Found</Card.Title>
                    <Card.Text>
                        We couldn't find customer data for this user. Please create a new Stripe customer.
                    </Card.Text>
                    <Button as={Link} to={`/teacher_portal/students/${paramsId}/create_stripe_account`} variant="primary">
                        Create Customer
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    // Customer exists, no subscription
    if (!hasSubscription) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>No Subscription</Card.Title>
                    <Card.Text>
                        You don't have an active subscription. Start your subscription today!
                    </Card.Text>
                    <Button as={Link} to={`/teacher_portal/students/${paramsId}/create_subscription`} variant="primary">
                        Start Subscription
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    // Customer and subscription exist
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                <Button as={Link} to={`/teacher_portal/students/${paramsId}/subscription`} variant="primary">
                    Manage Subscription
                </Button>
            </Card.Body>
        </Card>
    );
}
