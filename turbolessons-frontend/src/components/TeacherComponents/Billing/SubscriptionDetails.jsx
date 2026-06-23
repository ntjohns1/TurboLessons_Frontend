import React from "react";
import { Card } from "react-bootstrap";

// Everything needed comes from the (expanded) subscription object, so no
// separate product/price fetches are required.
const SubscriptionDetails = ({ subscription }) => {
    const price = subscription?.items?.data?.[0]?.price;
    const planName = price?.nickname || "Music Lessons";
    const unitAmount =
        price?.unitAmountDecimal != null
            ? (parseInt(price.unitAmountDecimal, 10) / 100).toFixed(2)
            : price?.unit_amount != null
            ? (price.unit_amount / 100).toFixed(2)
            : null;

    const startDate = subscription?.currentPeriodStart
        ? new Date(subscription.currentPeriodStart * 1000).toLocaleDateString()
        : "N/A";
    const endDate = subscription?.currentPeriodEnd
        ? new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()
        : "N/A";

    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                <Card.Text>Plan: {planName}</Card.Text>
                <Card.Text>Price: ${unitAmount ?? "N/A"} per lesson unit</Card.Text>
                <Card.Text>Billing Period: {startDate} - {endDate}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SubscriptionDetails;
