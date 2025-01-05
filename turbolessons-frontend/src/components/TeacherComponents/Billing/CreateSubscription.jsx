import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../../service/axiosConfig";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    updateSubscriptionFormState,
    resetSubscriptionFormState,
    fetchAllPricesThunk,
    resetCustomer,
    fetchPaymentMethodsByCustomerThunk,
} from "./BillingSlice";
import CreatePaymentMethod from "./CreatePaymentMethod";

const CreateSubscription = () => {
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();

    // Fetch subscription form state and price list from Redux
    const subscriptionFormState = useSelector((state) => state.billing.subscriptionFormState);
    const stripeCustomerId = useSelector((state) => state.billing.stripeCustomerId)
    const prices = useSelector((state) => {
        const priceState = state.billing.entities.prices;
        return priceState ? Object.values(priceState.entities || {}) : [];
    });
    const customerPaymentMethods = useSelector((state) => state.billing.stripeCustomerPaymentMethods)
    // Dispatch the thunk to fetch prices on component mount
    useEffect(() => {
        const accessToken = oktaAuth.getAccessToken();
        setAccessToken(accessToken);
        dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId }));
        dispatch(fetchAllPricesThunk());
        return () => {
            dispatch(resetCustomer());
        };
    }, [dispatch]);

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
                {customerPaymentMethods && customerPaymentMethods.length > 0 ? (
                    <Form.Select
                        name="defaultPaymentMethod"
                        value={subscriptionFormState.defaultPaymentMethod}
                        onChange={handleChange}
                    >
                        <option value="">Select Payment Method</option>
                        {customerPaymentMethods.map((method) => (
                            <option key={method.id} value={method.id}>
                                {method.type} - {method.details}
                            </option>
                        ))}
                    </Form.Select>
                ) : (
                    <CreatePaymentMethod />
                )}
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

export default CreateSubscription;