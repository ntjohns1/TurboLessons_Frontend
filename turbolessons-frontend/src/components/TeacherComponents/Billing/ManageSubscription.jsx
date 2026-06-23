import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import SubscriptionDetails from "./SubscriptionDetails";
import ManagePaymentMethod from "./ManagePaymentMethod";
import InvoiceHistory from "./InvoiceHistory";
import UpdateSubscription from "./UpdateSubscription";
import useBillingData from "./useBillingData";

const ManageSubscription = () => {
  const paramsId = useParams().id;
  const { customerId, subscriptionId, subscription } = useBillingData(paramsId);

  return (
    <Container>
      <Row>
        <SubscriptionDetails subscription={subscription} className="m-2" />
      </Row>
      <Row>
        <UpdateSubscription stripeSubscriptionId={subscriptionId} className="m-2" />
      </Row>
      <Row>
        <InvoiceHistory customerId={customerId} className="m-2" />
      </Row>
      <Row>
        <ManagePaymentMethod stripeCustomerId={customerId} className="m-2" />
      </Row>
    </Container>
  );
};

export default ManageSubscription;
