import React, { useEffect } from 'react';
import { Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InvoiceHistory from '../../components/StudentComponents/Payments/InvoiceHistory';
import CreatePaymentMethod from '../../components/StudentComponents/Payments/CreatePaymentMethod';
import SubscriptionDetail from '../../components/StudentComponents/Payments/SubscriptionDetail';
import ManagePaymentMethod from '../../components/StudentComponents/Payments/ManagePaymentMethod';
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../service/axiosConfig';
import { searchCustomersBySysIdThunk, fetchOneSubscriptionThunk } from "../../components/StudentComponents/Payments/PaymentsSlice";
import { formatCurrency, formatDate } from "../../util/formatters";

const Payments = () => {
    const [showModal, setShowModal] = React.useState(false);

    const { authState, oktaAuth } = useOktaAuth();
    const id = authState?.idToken?.claims?.sub;
    const dispatch = useDispatch();
    const customerAdapter = useSelector((state) => state.payments.entities["customer"]);
    const customerData = customerAdapter?.entities[id];

    const subscriptionId = useSelector((state) => state.payments?.subscriptionId);
    const subscriptions = useSelector((state) => state.payments?.entities?.subscriptions);
    const subscription = subscriptions?.entities[subscriptionId];

    const loading = useSelector((state) => state.payments?.loading);

    const plan = subscription?.items?.data[0]?.price?.productObject?.description;
    const price = subscription?.items?.data[0]?.price?.unitAmount;

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (authState?.isAuthenticated && id && !customerData) {
                try {
                    setAccessToken(oktaAuth.getAccessToken());
                    await dispatch(searchCustomersBySysIdThunk({ customerId: id })).unwrap();
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                }
            }
        };

        fetchCustomerData();
    }, [authState?.isAuthenticated, id, dispatch, oktaAuth, customerData]);

    useEffect(() => {
        const fetchSubscriptionData = async () => {
            if (subscriptionId) {
                try {
                    setAccessToken(oktaAuth.getAccessToken());
                    await dispatch(fetchOneSubscriptionThunk(subscriptionId)).unwrap();
                } catch (error) {
                    console.error("Error fetching subscription data:", error);
                }
            }
        };

        fetchSubscriptionData();
    }, [subscriptionId, dispatch, oktaAuth]);

    return (
        <Container>
            <Row>
                <SubscriptionDetail subscription={subscription} />
                <InvoiceHistory />
                {/* <CreateSubscription />
                    <CreateStripeAccount /> */}
                <ManagePaymentMethod />
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePaymentMethod showModal={showModal} setShowModal={setShowModal} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Payments;