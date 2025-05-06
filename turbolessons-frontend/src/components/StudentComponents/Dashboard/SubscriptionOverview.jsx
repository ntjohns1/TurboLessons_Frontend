import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../../service/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData, fetchCustomerSubscriptions } from "./StudentDashboardSlice";
import { formatCurrency, formatDate } from "../../../util/formatters";
import { Card } from "react-bootstrap";

const SubscriptionOverview = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const id = authState?.idToken?.claims?.sub;
    const dispatch = useDispatch();
    
    // Get data from Redux store
    const customer = useSelector((state) => state.studentDashboard?.customer);
    const subscription = useSelector((state) => state.studentDashboard?.subscription);
    const customerLoading = useSelector((state) => state.studentDashboard?.customerLoading || false);
    const subscriptionLoading = useSelector((state) => state.studentDashboard?.subscriptionLoading || false);
    const customerInitialized = useSelector((state) => state.studentDashboard?.customerInitialized || false);
    const subscriptionInitialized = useSelector((state) => state.studentDashboard?.subscriptionInitialized || false);
    
    // Extract subscription details
    const plan = subscription?.items?.data[0]?.price?.productObject?.description;
    const price = subscription?.items?.data[0]?.price?.unitAmount;

    // Fetch customer data when component mounts
    useEffect(() => {
        const fetchCustomer = async () => {
            if (authState?.isAuthenticated && id && !customerInitialized && !customerLoading) {
                try {
                    setAccessToken(oktaAuth.getAccessToken());
                    await dispatch(fetchCustomerData({ id })).unwrap();
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                }
            }
        };
        
        fetchCustomer();
    }, [authState?.isAuthenticated, id, dispatch, oktaAuth, customerInitialized, customerLoading]);

    // Fetch subscription data when customer data is available
    useEffect(() => {
        const fetchSubscription = async () => {
            if (customer?.subscriptions?.length > 0 && !subscriptionInitialized && !subscriptionLoading) {
                try {
                    setAccessToken(oktaAuth.getAccessToken());
                    const subscriptionId = customer.subscriptions[0];
                    await dispatch(fetchCustomerSubscriptions({ id: subscriptionId })).unwrap();
                } catch (error) {
                    console.error("Error fetching subscription data:", error);
                }
            }
        };
        
        fetchSubscription();
    }, [customer, dispatch, oktaAuth, subscriptionInitialized, subscriptionLoading]);
    
    const isLoading = customerLoading || subscriptionLoading;
    
    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                {isLoading ? (
                    <Card.Text>Loading subscription details...</Card.Text>
                ) : subscription ? (
                    <>
                        <Card.Text>Plan: {plan || 'N/A'}</Card.Text>
                        <Card.Text>Price: {price ? formatCurrency(price/100) : 'N/A'}</Card.Text>
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