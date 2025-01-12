import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../../service/axiosConfig";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    updateSubscriptionFormState,
    resetSubscriptionFormState,
    fetchPaymentMethodsByCustomerThunk,
    createSubscriptionThunk,
    fetchAllProductsThunk,
    searchCustomersBySysIdThunk,
    setShowPaymentMethodModal,
    setShowSuccessModal,
    setSuccessMessage,
    selectPaymentMethods,
    selectProducts,
} from "./BillingSlice";
import CreatePaymentMethod from "./CreatePaymentMethod";
import SuccessModal from "../../../helpers/SuccessModal";

const CreateSubscription = () => {
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();
    const navigate = useNavigate();
    const subscriptionFormState = useSelector((state) => state.billing.subscriptionFormState);
    const customerAdapter = useSelector((state) => state.billing.entities["customers"]);
    const id = useParams().id;
    const customer = Object.values(customerAdapter.entities).find(
        (c) => c.metadata?.okta_id === id
    );
    const stripeCustomerId = customer.id;

    const products = useSelector(selectProducts);
    const customerPaymentMethods = useSelector(selectPaymentMethods);
    const showPaymentMethodModal = useSelector((state) => state.billing.showPaymentMethodModal);
    const showSuccessModal = useSelector((state) => state.billing.showSuccessModal);
    const accessToken = oktaAuth.getAccessToken();
    const successMessage = useSelector((state) => state.billing.successMessage);

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
        // console.log("customerAdapter.entities:", customerAdapter.entities);
        // console.log("stripeCustomerId:", stripeCustomerId);
        // console.log("testCustomer:", customer);
        // console.log("paymentMethods:", customerPaymentMethods);
        console.log("showPaymentMethodModal:", showPaymentMethodModal);

    }, [dispatch]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (authState && authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            try {

                const result = await dispatch(createSubscriptionThunk(subscriptionFormState)).unwrap();
                console.log("Subscription created successfully:", result);
                dispatch(setShowSuccessModal(true));
            } catch (error) {

                console.error("Subscription creation failed:", error);
            }
        }

    };

    const handlePaymentMethodModalClose = () => {
        dispatch(setShowPaymentMethodModal(false));
        dispatch(setSuccessMessage(""));
        dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId }));
    };

    const handleSuccessModalClose = () => {
        dispatch(setSuccessMessage(""));
        dispatch(setShowSuccessModal(false));
        dispatch(resetSubscriptionFormState());
        // dispatch(resetModal());
        navigate(`/students/${id}`)
    }

    return (
        <>
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
                        <Button variant="link" onClick={() => dispatch(setShowPaymentMethodModal(true))}>
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
                {/* Payment Method Modal */}
                <Modal
                    show={showPaymentMethodModal}
                    onHide={handlePaymentMethodModalClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Payment Method</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreatePaymentMethod
                            sysId={id}
                        />
                    </Modal.Body>
                </Modal>
                <SuccessModal
                    show={showSuccessModal}
                    message={successMessage}
                    onClose={handleSuccessModalClose}
                />
            </Form>
            {/* )} */}
        </>
    );
};

export default CreateSubscription;