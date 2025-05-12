import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../../service/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { searchCustomersBySysIdThunk, fetchOneSubscriptionThunk } from "../Payments/PaymentsSlice";
import { formatCurrency, formatDate } from "../../../util/formatters";
import { Card } from "react-bootstrap";

const SubscriptionOverview = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const id = authState?.idToken?.claims?.sub;
    const dispatch = useDispatch();
    const subscriptionId = useSelector((state) => state.payments?.subscriptionId);
    const subscriptions = useSelector((state) => state.payments?.entities?.subscriptions);
    const subscription = subscriptions?.entities[subscriptionId];

    const loading = useSelector((state) => state.payments?.loading);

    const plan = subscription?.items?.data[0]?.price?.productObject?.description;
    const price = subscription?.items?.data[0]?.price?.unitAmount;

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (authState?.isAuthenticated && id) {
                try {
                    setAccessToken(oktaAuth.getAccessToken());
                    await dispatch(searchCustomersBySysIdThunk({ customerId: id })).unwrap();
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                }
            }
        };

        fetchCustomerData();
    }, [authState?.isAuthenticated, id, dispatch, oktaAuth]);

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

    const isLoading = loading;

    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                {isLoading ? (
                    <Card.Text>Loading subscription details...</Card.Text>
                ) : subscription ? (
                    <>
                        <Card.Text>Plan: {plan || 'N/A'}</Card.Text>
                        <Card.Text>Price: {price ? formatCurrency(price / 100) : 'N/A'}</Card.Text>
                        <Card.Text>Next Payment: {subscription?.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : 'N/A'}</Card.Text>
                    </>
                ) : (
                    <Card.Text>No active subscription found</Card.Text>
                )}
            </Card.Body>
        </Card>
    );
};

export default SubscriptionOverview;