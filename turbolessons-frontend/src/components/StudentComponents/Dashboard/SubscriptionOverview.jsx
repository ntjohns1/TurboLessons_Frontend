import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

const SubscriptionOverview = () => {
    const subscription = {
        plan: "Basic",
        price: 10,
        nextPayment: "2022-01-01",
    }
    return (

            <Card className="m-2">
                <Card.Body>
                    <Card.Title>Subscription Details</Card.Title>
                    <Card.Text>Plan:    {subscription.plan}</Card.Text>
                    <Card.Text>Price:   ${subscription.price}</Card.Text>
                    <Card.Text>Next Payment: {subscription.nextPayment}</Card.Text>
                </Card.Body>
            </Card>
    );
};
export default SubscriptionOverview;