import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllProductsThunk,
    fetchAllPricesThunk,
    fetchItemsBySubscriptionThunk,
    createSubscriptionItemThunk
} from './BillingSlice';
import { selectProducts } from './BillingSlice';
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { formatCurrency } from '../../../util/formatters';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const UpdateSubscription = ({ subscription }) => {
    // service layer: subscription item routes
    // display current subscription plan
    // fetch items by subscription
    // form inputs for subscription item crud operations
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const products = useSelector(selectProducts);
    const prices = useSelector((state) => state.billing.entities["prices"]);
    const stripeSubscriptionId = subscription?.id;
    const subscriptionItems = useSelector((state) => state.billing.entities["subscriptionItems"]);

    // State for the new subscription item form
    const [selectedProduct, setSelectedProduct] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

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
                    console.log("Subscription items response:", JSON.stringify(response, null, 2));
                    const firstItem = response.payload.data?.[0];
                    const productObject = firstItem?.price?.productObject;
                    if (productObject) {
                        console.log("Product Object description:", productObject.description);
                        console.log("Product Object price:", typeof firstItem.plan.amount);
                    }
                })
                .catch(error => {
                    console.error("Error fetching subscription items:", error);
                });
        }
    }, [dispatch, stripeSubscriptionId]);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleAddItem = () => {
        if (!selectedProduct) {
            setMessage({ text: 'Please select a lesson type', type: 'danger' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        // Create the new subscription item
        dispatch(createSubscriptionItemThunk({
            subscriptionId: stripeSubscriptionId,
            price: selectedProduct,
            quantity: 1
        }))
            .then(response => {
                console.log('Subscription item created:', response);
                setMessage({ text: 'Lesson type added successfully!', type: 'success' });
                setSelectedProduct('');

                // Refresh the subscription items
                return dispatch(fetchItemsBySubscriptionThunk({ subscriptionId: stripeSubscriptionId }));
            })
            .catch(error => {
                console.error('Error creating subscription item:', error);
                setMessage({ text: 'Failed to add lesson type. Please try again.', type: 'danger' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
            <Card className="m-2">
                <Card.Body>
                    <h5>Update Lesson Plan</h5>
                    {message.text && (
                        <Alert variant={message.type} onClose={() => setMessage({ text: '', type: '' })} dismissible>
                            {message.text}
                        </Alert>
                    )}
                    <Form>
                        <Row>
                            <Col md={8}>
                                <Form.Group>
                                    <Form.Select
                                        value={selectedProduct}
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
                                    onClick={handleAddItem}
                                    disabled={!selectedProduct || loading}
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
