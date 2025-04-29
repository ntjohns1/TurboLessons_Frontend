import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllProductsThunk,
    fetchAllPricesThunk,
    fetchItemsBySubscriptionThunk,
    updateSubscriptionItemThunk,
    updateSubscriptionItemFormState,
    resetSubscriptionItemFormState,
    setSuccessMessage,
    setError,
    setLoading,
    setShowSuccessModal
} from './BillingSlice';
import { selectProducts } from './BillingSlice';
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { formatCurrency } from '../../../util/formatters';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const UpdateSubscription = ({ stripeSubscriptionId }) => {
    // service layer: subscription item routes
    // display current subscription plan
    // fetch items by subscription
    // form inputs for subscription item crud operations
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const products = useSelector(selectProducts);
    const prices = useSelector((state) => state.billing.entities["prices"]);

    // State for the new subscription item form
    const loading = useSelector((state) => state.billing.loading);
    const successMessage = useSelector((state) => state.billing.successMessage);
    const error = useSelector((state) => state.billing.error);
    const subscriptionItemFormState = useSelector((state) => state.billing.subscriptionItemFormState);

    useEffect(() => {
        if (!products.length || !prices.length) {
            setAccessToken(accessToken);
            console.log(accessToken);

            dispatch(fetchAllProductsThunk());
            dispatch(fetchAllPricesThunk());
        }
    }, [dispatch, products.length, prices.length, accessToken]);


    useEffect(() => {
        if (stripeSubscriptionId) {
            dispatch(fetchItemsBySubscriptionThunk({ subscriptionId: stripeSubscriptionId }))
                .then(response => {
                    // Extract the subscription item ID and price ID from the response
                    const items = response.payload.data;
                    if (items && items.length > 0) {
                        const firstItem = items[0];
                        const subscriptionItemId = firstItem.id;
                        const currentPriceId = firstItem.price?.id;
                        
                        console.log("Current subscription item ID:", subscriptionItemId);
                        console.log("Current price ID:", currentPriceId);
                        
                        // Store these values in the Redux state
                        dispatch(updateSubscriptionItemFormState({ field: "subscriptionItemId", value: subscriptionItemId }));
                        dispatch(updateSubscriptionItemFormState({ field: "currentPriceId", value: currentPriceId }));
                    }
                })
                .catch(error => {
                    console.error("Error fetching subscription items:", error);
                });
        }
    }, [dispatch, stripeSubscriptionId, accessToken]);

    const handleProductChange = (e) => {
        dispatch(updateSubscriptionItemFormState({ field: "productId", value: e.target.value }));
    };

    const handleUpdateSubscriptionItem = () => {
        // Set loading state
        dispatch(setLoading(true));
        
        // Clear any previous messages
        dispatch(setSuccessMessage(''));
        dispatch(setError(null));
        
        // Call the update thunk with the subscription item ID and the new price ID
        // The updateItem thunk in reduxUtil.js expects { id, data } format
        dispatch(updateSubscriptionItemThunk({
            id: subscriptionItemFormState.subscriptionItemId,
            data: {
                price: subscriptionItemFormState.productId
            }
        }))
        .then(() => {
            // On success
            dispatch(setSuccessMessage('Subscription plan updated successfully!'));
            dispatch(setShowSuccessModal(true));
            
            // Refresh the subscription items
            return dispatch(fetchItemsBySubscriptionThunk({ subscriptionId: stripeSubscriptionId }));
        })
        .catch(err => {
            // On error
            dispatch(setError('Failed to update subscription plan. Please try again.'));
            console.error('Error updating subscription item:', err);
        })
        .finally(() => {
            // Reset loading state
            dispatch(setLoading(false));
            dispatch(resetSubscriptionItemFormState());
            dispatch(setShowSuccessModal(false));
            dispatch(setError(null));
        });
    };

    return (
        <Card className="m-2">
            <Card.Body>
                <h5>Update Lesson Plan</h5>
                {successMessage && (
                    <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                        {successMessage}
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" onClose={() => setError(null)} dismissible>
                        {error}
                    </Alert>
                )}
                <Form>
                    <Row>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Select
                                    value={subscriptionItemFormState.productId}
                                    onChange={handleProductChange}
                                    disabled={loading}
                                >
                                    <option value="">Select Lesson Type</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.defaultPrice}>
                                            {product.description}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Button
                                variant="primary"
                                onClick={handleUpdateSubscriptionItem}
                                disabled={!subscriptionItemFormState.productId || loading}
                            >
                                {loading ? 'Updating...' : 'Submit'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UpdateSubscription;
