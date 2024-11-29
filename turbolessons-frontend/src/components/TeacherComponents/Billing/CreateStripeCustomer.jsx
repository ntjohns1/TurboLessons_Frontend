import React, {useEffect } from "react";
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCustomerThunk } from "./BillingSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';

const CreateStripeCustomer = ({ id }) => {

    const dispacth = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispacth(createCustomerThunk())
    };

    return (
        <Card>
            <Card.Header> No Stripe account was found for this user, would you like to create one now?</Card.Header>
            <Card.Body> 
                <Button>Confirm</Button>
            </Card.Body>
        </Card>
    )
};

export default CreateStripeCustomer;