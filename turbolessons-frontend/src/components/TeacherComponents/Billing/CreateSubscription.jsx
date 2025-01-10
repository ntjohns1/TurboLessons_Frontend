import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../../service/axiosConfig";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    updateSubscriptionFormState,
    resetSubscriptionFormState,
    resetCustomer,
    fetchPaymentMethodsByCustomerThunk,
    createSubscriptionThunk,
    fetchAllProductsThunk,
    searchCustomersBySysIdThunk,
    setShow
} from "./BillingSlice";
import CreatePaymentMethod from "./CreatePaymentMethod";

const CreateSubscription = () => {
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();

    const loading = useSelector((state) => state.billing.loading);
    const subscriptionFormState = useSelector((state) => state.billing.subscriptionFormState);
    const stripeCustomerId = useSelector((state) => state.billing.stripeCustomerId);
    const customerAdapter = useSelector((state) => state.billing.entities["customers"]);
    const products = useSelector((state) => Object.values(state.billing.entities["products"].entities));
    const customerPaymentMethods = useSelector((state) => state.billing.stripeCustomerPaymentMethods);
    const showPaymentMethodModal = useSelector((state) => state.billing.show);
    const setShowPaymentMethodModal = (show) => dispatch(setShow(show));
    const accessToken = oktaAuth.getAccessToken();
    const id = useParams().id;

    useEffect(() => {
        if (!customerAdapter.entities[stripeCustomerId]) {
            setAccessToken(accessToken);
            dispatch(searchCustomersBySysIdThunk({ customerId: id }));
        }
    }, []);

    useEffect(() => {
        setAccessToken(accessToken);
        if (stripeCustomerId) {
            dispatch(updateSubscriptionFormState({ field: "customerId", value: stripeCustomerId }));
        }
        dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId }));
        dispatch(fetchAllProductsThunk());
    }, [dispatch, stripeCustomerId]);

    useEffect(() => {
        console.log("customerAdapter.entities:", customerAdapter.entities);
        console.log("stripeCustomerId:", stripeCustomerId);
    }, [customerAdapter, stripeCustomerId]);

    const handleModalClose = () => {
        setShowPaymentMethodModal(false);
        dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccessToken(accessToken);
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

        dispatch(createSubscriptionThunk(subscriptionFormState));
        dispatch(resetCustomer());
    };

    return (
        <>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading subscription details...</p>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    {/* Customer Name */}
                    <h3>Customer: {customerAdapter.entities[stripeCustomerId]?.name || "Loading..."}</h3>

                    {/* Subscription Items */}
                    <Form.Label>Subscription Items</Form.Label>
                    {products.length > 0 ? (
                        subscriptionFormState.items.map((item, index) => (
                            <Row key={index}>
                                <Col>
                                    <Form.Select
                                        value={item}
                                        onChange={(e) => handleItemsChange(e, index)}
                                        placeholder={`Select Price ID ${index + 1}`}
                                    >
                                        <option value="">Select Lesson Type</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.defaultPrice}>
                                                {product.description}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <div>Loading products...</div>
                    )}
                    <Button variant="link" onClick={addNewItem}>
                        Add Item
                    </Button>

                    {/* Default Payment Method */}
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
                                        {method.type} - {method.card?.last4 || "N/A"}
                                    </option>
                                ))}
                            </Form.Select>
                        ) : (
                            <Button variant="link" onClick={() => setShowPaymentMethodModal(true)}>
                                Add New Payment Method
                            </Button>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Subscription
                    </Button>
                    <Button variant="secondary" onClick={() => dispatch(resetSubscriptionFormState())}>
                        Reset Form
                    </Button>
                    <Modal show={showPaymentMethodModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a Payment Method</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreatePaymentMethod onSuccess={handleModalClose} />
                        </Modal.Body>
                    </Modal>
                </Form>
            )}
        </>
    );
};

export default CreateSubscription;