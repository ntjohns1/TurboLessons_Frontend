import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SubscriptionDetails from "./SubscriptionDetails";
import { fetchOneSubscriptionThunk, fetchItemsBySubscriptionThunk } from "./BillingSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import ManagePaymentMethod from "./ManagePaymentMethod";
import InvoiceHistory from "./InvoiceHistory";
import UpdateSubscription from "./UpdateSubscription";



const ManageSubscription = () => {

  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const dispatch = useDispatch();
  const paramsId = useParams().id;
  const customerAdapter = useSelector((state) => state.billing.entities["customers"]);
  const subscriptionAdapter = useSelector((state) => state.billing.entities["subscriptions"]);
  const customer = Object.values(customerAdapter.entities).find(
    (c) => c.metadata?.okta_id === paramsId
  );
  // Todo: This should handle multiple subscriptions
  const stripeSubscriptionId = customer?.subscriptions?.[0] || "";
  const subscription = Object.values(subscriptionAdapter.entities).find((s) => s.id === stripeSubscriptionId);

  useEffect(() => {
    setAccessToken(accessToken);
    if (stripeSubscriptionId) {
      dispatch(fetchOneSubscriptionThunk(stripeSubscriptionId));
    }

  }, [dispatch, stripeSubscriptionId, accessToken]);

  return (
    <Container >
      <Row>
        <SubscriptionDetails subscription={subscription} className="m-2"/>
      </Row>
      <Row>
        <UpdateSubscription stripeSubscriptionId={stripeSubscriptionId} className="m-2"/>
      </Row>
      <Row>
        <InvoiceHistory subscriptionId={stripeSubscriptionId} className="m-2"/>
      </Row>
      <Row>
        <ManagePaymentMethod stripeCustomerId={customer?.id} className="m-2"/>
      </Row>
     
    </Container>
  );
};

export default ManageSubscription;