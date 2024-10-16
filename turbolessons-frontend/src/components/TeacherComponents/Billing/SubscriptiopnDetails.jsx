import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";

const SubscriptionDetails = () => {

    // pass in subscription  {
    // 
    // }
    return (
        <Card className="m-3">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                <Card.Text>Status: Active</Card.Text>
                <Card.Text>Plan: Monthly - $60</Card.Text>
                <Card.Text>Renewal Date: 01/07/2024</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default SubscriptionDetails;