import React from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import SubscriptionDetails from "./SubscriptionDetails";
import InvoiceHistory from "./InvoiceHistory";
import useBillingData from "./useBillingData";

const ManageSubscription = () => {
  const paramsId = useParams().id;
  const { customerId, subscription, openPortal, isRedirecting } =
    useBillingData(paramsId);

  return (
    <Container>
      <Row>
        <SubscriptionDetails subscription={subscription} className="m-2" />
      </Row>
      <Row>
        <InvoiceHistory customerId={customerId} className="m-2" />
      </Row>
      <Row className="m-2">
        {/* Payment methods, cancellation, and full invoice management happen in
            the Stripe-hosted Customer Portal. */}
        <Card className="m-2">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <span>Update payment method, cancel, or download invoices.</span>
            <Button variant="primary" onClick={openPortal} disabled={isRedirecting || !customerId}>
              Manage Billing
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ManageSubscription;
