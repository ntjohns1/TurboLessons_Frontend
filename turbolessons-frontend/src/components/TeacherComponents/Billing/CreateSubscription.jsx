import React, { useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    updateSubscriptionFormState,
    resetSubscriptionFormState,
    fetchAllPricesThunk,
    resetCustomer
} from "./BillingSlice";

const NewSubscriptionForm = () => {
    const dispatch = useDispatch();

    // Fetch subscription form state and price list from Redux
    const subscriptionFormState = useSelector((state) => state.billing.subscriptionFormState);
    const stripeCustomerId = useSelector((state) => state.billing.stripeCustomerId)
    const prices = useSelector((state) => {
        const priceState = state.billing.entities.prices;
        return priceState ? Object.values(priceState.entities || {}) : [];
    });
    // Dispatch the thunk to fetch prices on component mount
    useEffect(() => {
        dispatch(fetchAllPricesThunk());
        return () => {
            dispatch(resetCustomer());
        };
    }, [dispatch]);

    useEffect(() => {
        console.log("Prices in Redux:", prices); // Ensure prices are fetched and populated
    }, [prices]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateSubscriptionFormState({ field: name, value }));
    };

    const handleItemsChange = (e, index) => {
        const updatedItems = [...subscriptionFormState.items];
        updatedItems[index] = e.target.value;
        dispatch(updateSubscriptionFormState({ field: "items", value: updatedItems }));
    };

    const addNewItem = () => {
        dispatch(
            updateSubscriptionFormState({
                field: "items",
                value: [...subscriptionFormState.items, ""],
            })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting subscription:", subscriptionFormState);
        // Dispatch the appropriate action to create the subscription
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="customerId">
                <Form.Label>Customer ID</Form.Label>
                <Form.Control
                    type="text"
                    name="customerId"
                    value={stripeCustomerId}
                    readOnly={true}
                />
            </Form.Group>
            <Form.Label>Subscription Items</Form.Label>
            {prices.length > 0 ? (
                subscriptionFormState.items.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Form.Select
                                value={item}
                                onChange={(e) => handleItemsChange(e, index)}
                                placeholder={`Select Price ID ${index + 1}`}
                            >
                                <option value="">Select Price</option>
                                {prices.map((price) => (
                                    <option key={price.id} value={price.id}>
                                        {price.unitAmount / 100} {price.currency.toUpperCase()}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                ))
            ) : (
                <div>Loading prices...</div>
            )}
            <Button variant="link" onClick={addNewItem}>
                Add Item
            </Button>
            <Form.Group controlId="defaultPaymentMethod">
                <Form.Label>Default Payment Method</Form.Label>
                <Form.Control
                    type="text"
                    name="defaultPaymentMethod"
                    value={subscriptionFormState.defaultPaymentMethod}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Subscription
            </Button>
            <Button variant="secondary" onClick={() => dispatch(resetSubscriptionFormState())}>
                Reset Form
            </Button>
        </Form>
    );
};

export default NewSubscriptionForm;