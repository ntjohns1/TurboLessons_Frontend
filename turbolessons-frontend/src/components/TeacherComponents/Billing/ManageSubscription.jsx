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
  const stripeSubscriptionId = customer ? customer.subscriptions[0] : "";
  const subscription = Object.values(subscriptionAdapter.entities).find((s) => s.id === stripeSubscriptionId);

  useEffect(() => {
    if (stripeSubscriptionId && authState?.isAuthenticated) {
      dispatch(fetchItemsBySubscriptionThunk({ subscriptionId: stripeSubscriptionId }))
        .catch(error => {
          console.error("Error fetching subscription items:", error);
        });
    }
  }, [dispatch, stripeSubscriptionId]);

  useEffect(() => {
    setAccessToken(accessToken);
    if (stripeSubscriptionId) {
      dispatch(fetchOneSubscriptionThunk(stripeSubscriptionId));
    }

  }, [dispatch, stripeSubscriptionId]);

  return (
    <Container >
      <Row >
        <Col md={12}>
          <Card className="mb-3">
            <Row>
              <Col md={6}>
                <SubscriptionDetails subscription={subscription} />
              </Col>
              <Col md={6}>
                <UpdateSubscription paramsId={paramsId} subscription={subscription} />
              </Col>
            </Row>
          </Card>
          <InvoiceHistory subscriptionId={stripeSubscriptionId} />
          <ManagePaymentMethod paramsId={paramsId} />
        </Col>
      </Row>
    </Container>
  );
};

export default ManageSubscription;