import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsThunk, fetchAllPricesThunk, fetchItemsBySubscriptionThunk } from './BillingSlice';
import { selectProducts } from './BillingSlice';
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { formatCurrency } from '../../../util/formatters';

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
    const amount = 
    useEffect(() => {
        if (!products.length || !prices.length) {
            setAccessToken(accessToken);
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
                    console.log("Product Object description:", productObject.description);
                    console.log("Product Object price:", typeof firstItem.plan.amount);
                })
                .catch(error => {
                    console.error("Error fetching subscription items:", error);
                });
        }
    }, [dispatch, stripeSubscriptionId]);


    return (
        <div className="container mt-4">
            <h2>Update Subscription</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Current Subscription</h5>
                    <p>Subscription ID: {stripeSubscriptionId || 'Not available'}</p>
                    
                    {/* Display subscription items */}
                    <h5 className="mt-4">Subscription Items</h5>
                    {subscriptionItems && subscriptionItems.ids && subscriptionItems.ids.length > 0 ? (
                        <ul className="list-group">
                            {subscriptionItems.ids.map(itemId => {
                                const item = subscriptionItems.entities[itemId];
                                return (
                                    <li key={itemId} className="list-group-item">
                                        <p>Lesson Type: {item.price?.productObject?.description || 'N/A'}</p>
                                        <p>Price Per Lesson:   $ {item.price ? (parseInt(item.price.unitAmountDecimal, 10) / 100).toFixed(2) : 'N/A'}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No subscription items found</p>
                    )}

                    {/* Add form for managing subscription items here */}
                </div>
            </div>
        </div>
    );
};

export default UpdateSubscription;
