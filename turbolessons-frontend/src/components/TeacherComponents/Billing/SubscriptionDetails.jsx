import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table, Form, Button, Card } from "react-bootstrap";
import { fetchAllPricesThunk, fetchAllProductsThunk } from "./BillingSlice";

const SubscriptionDetails = ({subscription}) => {
    const dispatch = useDispatch();
    const productAdapter = useSelector((state) => state.billing.entities["products"]);
    const priceAdapter = useSelector((state) => state.billing.entities["prices"]);
    const product = Object.values(productAdapter.entities).find(p => p.id === subscription?.items?.data[0].price.product);
    const price = Object.values(priceAdapter.entities).find(p => p.id === subscription.items?.data[0].price.id);
    const periodStart  = subscription.currentPeriodStart;
    const startDate = periodStart ? new Date(periodStart * 1000).toLocaleDateString() : 'N/A';
    const periodEnd  = subscription.currentPeriodEnd;
    const endDate = periodEnd ? new Date(periodEnd * 1000).toLocaleDateString() : 'N/A';
    useEffect(() => {
    if (!productAdapter.ids.length || !priceAdapter.ids.length) {   
        dispatch(fetchAllPricesThunk());
        dispatch(fetchAllProductsThunk());

    }
    // console.log("Product:" + JSON.stringify(product));  
    // console.log(JSON.stringify(price));
    console.log(subscription);
    console.log(startDate);
    
    
  }, [productAdapter, priceAdapter]);
    return (
        <Card className="m-3">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                <Card.Text>Plan:    {product?.description}</Card.Text>
                <Card.Text>Price:   ${price ? (parseInt(price.unitAmountDecimal, 10) / 100).toFixed(2) : 'N/A'}</Card.Text>
                <Card.Text>Billing Period: {startDate} - {endDate}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default SubscriptionDetails;