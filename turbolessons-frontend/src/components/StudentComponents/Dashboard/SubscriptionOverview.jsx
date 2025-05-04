import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../../service/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData, fetchCustomerSubscriptions } from "./StudentDashboardSlice";
import { formatCurrency, formatDate } from "../../../util/formatters";
import { Card } from "react-bootstrap";

const SubscriptionOverview = () => {
    // const subscription = {
    //     plan: "Basic",
    //     price: 10,
    //     nextPayment: "2022-01-01",
    // }

    const { authState, oktaAuth } = useOktaAuth();
    const id = authState?.idToken?.claims?.sub;
    const dispatch = useDispatch();
    const customer = useSelector((state) => state.lessons?.customer);
    const subscription = useSelector((state) => state.lessons?.subscription);
    const plan = subscription?.items?.data[0]?.price?.productObject?.description;
    const price = subscription?.items?.data[0]?.price?.unitAmount;

    useEffect(() => {
        const fetchData = async () => {
            if (authState?.isAuthenticated && id) {
                try {
                    setAccessToken(oktaAuth.getAccessToken());
                    
                    // Fetch customer data first
                    const customerResponse = await dispatch(fetchCustomerData({ id })).unwrap();
                    console.log("Customer: ", JSON.stringify(customerResponse, null, 2));
                    // Check if customer has subscriptions
                    if (customerResponse?.subscriptions && customerResponse.subscriptions.length > 0) {
                        const subscriptionId = customerResponse.subscriptions[0];
                        
                        // Now fetch subscription details
                        dispatch(fetchCustomerSubscriptions({ id: subscriptionId }));
                    }
                } catch (error) {
                    console.error("Error fetching subscription data:", error);
                }
            }
        };
        
        fetchData();
    }, [authState?.isAuthenticated, id, dispatch, oktaAuth]);

    useEffect(() => {
        if (subscription) {
            console.log("Subscription: ", JSON.stringify(subscription, null, 2));
        }
    }, [subscription]);
    
    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                <Card.Text>Plan:    {plan}</Card.Text>
                <Card.Text>Price:   {formatCurrency(price/100)}</Card.Text>
                <Card.Text>Next Payment: {formatDate(subscription?.currentPeriodEnd)}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SubscriptionOverview;