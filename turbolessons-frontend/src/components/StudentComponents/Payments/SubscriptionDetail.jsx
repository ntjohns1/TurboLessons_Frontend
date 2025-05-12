import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../../service/axiosConfig";
import { fetchAllPricesThunk, fetchAllProductsThunk, fetchOneSubscriptionThunk } from "../Payments/PaymentsSlice";
import { Card } from "react-bootstrap";

const SubscriptionDetail = ({ subscription }) => {
    const dispatch = useDispatch();
    const { oktaAuth } = useOktaAuth();
    const productAdapter = useSelector((state) => state.payments.entities["products"]);
    const priceAdapter = useSelector((state) => state.payments.entities["prices"]);
    const product = Object.values(productAdapter.entities).find(p => p.id === subscription?.items?.data[0].price.product);
    const price = Object.values(priceAdapter.entities).find(p => p.id === subscription?.items?.data[0].price.id);
    const periodStart = subscription?.currentPeriodStart;
    const startDate = periodStart ? new Date(periodStart * 1000).toLocaleDateString() : 'N/A';
    const periodEnd = subscription?.currentPeriodEnd;
    const endDate = periodEnd ? new Date(periodEnd * 1000).toLocaleDateString() : 'N/A';
    
    useEffect(() => {
        if (!productAdapter.ids.length || !priceAdapter.ids.length) {
            setAccessToken(oktaAuth.getAccessToken());
            dispatch(fetchAllPricesThunk());
            dispatch(fetchAllProductsThunk());

        }
    }, [productAdapter, priceAdapter, dispatch, oktaAuth]);

    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>Subscription Details</Card.Title>
                <Card.Text>Plan:    {product?.description}</Card.Text>
                <Card.Text>Price:   ${price ? (parseInt(price.unitAmountDecimal, 10) / 100).toFixed(2) : 'N/A'}</Card.Text>
                <Card.Text>Billing Period: {startDate} - {endDate}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default SubscriptionDetail;