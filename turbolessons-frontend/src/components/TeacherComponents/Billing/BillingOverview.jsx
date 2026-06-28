import React from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../../../App'
import useBillingData from './useBillingData';

export default function BillingOverview() {
    const paramsId = useParams().id;
    const { hasSubscription, isLoading, isRedirecting, enroll, openPortal } =
        useBillingData(paramsId);

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

    // Not subscribed yet → Stripe Checkout enrollment (creates the customer if
    // needed, collects the card, and creates the metered subscription).
    if (!hasSubscription) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>No Active Subscription</Card.Title>
                    <Card.Text>
                        Enroll this student in lesson billing. They'll be charged monthly
                        for the lessons logged that period.
                    </Card.Text>
                    <Button variant="primary" onClick={enroll} disabled={isRedirecting}>
                        {isRedirecting ? <Spinner animation="border" size="sm" /> : 'Enroll in Billing'}
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    // Subscribed → manage via the Stripe Customer Portal.
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Subscription Active</Card.Title>
                <Card.Text>
                    Manage payment methods, view invoices, or cancel in the billing portal.
                </Card.Text>
                <Button variant="primary" onClick={openPortal} disabled={isRedirecting}>
                    {isRedirecting ? <Spinner animation="border" size="sm" /> : 'Manage Billing'}
                </Button>
            </Card.Body>
        </Card>
    );
}
