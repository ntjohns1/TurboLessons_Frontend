import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PaymentMethodModal from "./CreatePaymentMethod";
import SubscriptionDetails from "./SubscriptionDetails";
import { createCustomerThunk, searchCustomersBySysIdThunk, fetchOneSubscriptionThunk } from "./BillingSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { use } from "react";


const ManageSubscription = () => {
  /*
      High Level Process:
      


      - Requirements:
          - Viewing current subscription status and details.
          - Updating subscription plans.
          - Viewing billing history.
          - Adding or updating payment methods.
          - Handling payment processing and errors.

      
  */

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const dispatch = useDispatch();
  const paramsId = useParams().id;
  const customerAdapter = useSelector((state) => state.billing.entities["customers"]);
  const subscriptionAdapter = useSelector((state) => state.billing.entities["subscriptions"]);
  const customer = Object.values(customerAdapter.entities).find(
    (c) => c.metadata?.okta_id === paramsId
  );
  const stripeCustomerId = customer ? customer.id : "";
  // Todo: This should handle multiple subscriptions
  const stripeSubscriptionId = customer ? customer.subscriptions[0] : "";
  const subscription = Object.values(subscriptionAdapter.entities).find((s) => s.id === stripeSubscriptionId);

  useEffect(() => {
    console.log(subscription);
    
  }, [subscriptionAdapter]);

  useEffect(() => {
    const customer = Object.values(customerAdapter.entities).find(
      (c) => c.metadata?.okta_id === paramsId
    );
    console.log("customer", customer);

    console.log("subscriptions", customer?.subscriptions);

    setAccessToken(accessToken);
    if (stripeSubscriptionId) {

      dispatch(fetchOneSubscriptionThunk(stripeSubscriptionId)).then((response) => {
        console.log("Thunk Response:", response.payload); // Log the response from the thunk
      });
    }

  }, [customerAdapter]);

  /*
  application: null
applicationFeePercent: null
applicationObject: null
automaticTax: {enabled: false, liability: null}
billingCycleAnchor: 1733696798
billingThresholds: null
cancelAt: null
cancelAtPeriodEnd: false
canceledAt: null
cancellationDetails: {commen: null, feedback: null, reason: null}
collectionMethod: "charge_automatically"
created: 1733696798
currency: "usd"
currentPeriodEnd: 1741472798
currentPeriodStart: 1739053598
customer: "cus_RHGJfleiSFtUUQ"
customerObject: null
daysUntilDue: null
defaultPaymentMethod: null
defaultPaymentMethodObject: null
defaultSource: null
defaultSourceObject: null
defaultTaxRates: []
description: null
discount: null
discountObjects: []
discounts: []
endedAt: null
id: "sub_1QTsvyDmZLVpivSLh6YmMXsx"
items: 
  data: Array(1)
    0: 
      billingThresholds: null
      created: 1733696798
      deleted: null
      discountObjects: []
      discounts: []
      id: "si_RMcANq0pJrIPT4"
      metadata: {}
      object: "subscription_item"
      plan: {active: true, aggregateUsage: null, amount: 3000, amountDecimal: 3000, billingScheme: 'per_unit', …}
      price: {active: true, billingScheme: 'per_unit', created: 1723650923, currency: 'usd', currencyOptions: null, …}
      quantity: null
      subscription: "sub_1QTsvyDmZLVpivSLh6YmMXsx"
      taxRates: []
      trial: null
      [[Prototype]]: Object
    length: 1
  [[Prototype]]: Array(0)
  hasMore: false
  object: "list"
  requestParams: null
  url: "/v1/subscription_items?subscription=sub_1QTsvyDmZLVpivSLh6YmMXsx"
[[Prototype]]: Object
latestInvoice: "in_1QqMUFDmZLVpivSL2DCfqRtq"
latestInvoiceObject: null
livemode: false
metadata: {}
nextPendingInvoiceItemInvoice: null
object: "subscription"
onBehalfOf: null
onBehalfOfObject: null
pauseCollection: null
paymentSettings: {paymentMethodOptions: null, paymentMethodTypes: null, saveDefaultPaymentMethod: 'off'}
pendingInvoiceItemInterval: null
pendingSetupIntent: "seti_1QTsvzDmZLVpivSLHaVMq5Gl"
pendingSetupIntentObject: null
pendingUpdate: null
prebilling: null
schedule: null
scheduleObject: null
startDate: 1733696798
status: "active"
testClock: null
testClockObject: null
transferData: null
trialEnd: null
trialSettings: {endBehavior: {…}}
trialStart: null
  */

  return (
    <Container >
      <Row >
        <Col md={12}>
          <Card className="mb-3">
            <Row>
              <Col md={6}>
                <SubscriptionDetails subscription={subscription}/>
              </Col>
              <Col md={6}>
                <Card className="m-3">
                  <Card.Body>
                    <Card.Title className="text-center">Update Subscription Plan</Card.Title>
                    <Form>
                      <Form.Group controlId="subscriptionPlan" className="text-center">
                        <Form.Label>Choose a new plan</Form.Label>
                        <Form.Control as="select">
                          <option className="text-center">Monthly - $60</option>
                          <option className="text-center">Quarterly - $50</option>
                          <option className="text-center">Yearly - $180</option>
                        </Form.Control>
                      </Form.Group>
                      <div className="mt-3 text-center">
                        <Button variant="primary" type="submit">Update Plan</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <h3>Billing History</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01/06/2024</td>
                    <td>$60</td>
                    <td>Paid</td>
                  </tr>
                  <tr>
                    <td>01/05/2024</td>
                    <td>$60</td>
                    <td>Paid</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h3>Payment Methods</h3>
              <p>Current Method: **** **** **** 1234</p>
              <Button variant="primary" onClick={handleShow}>Manage Payment Methods</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageSubscription;