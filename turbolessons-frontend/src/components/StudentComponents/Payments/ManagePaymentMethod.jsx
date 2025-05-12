import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchPaymentMethodsByCustomerThunk, 
  selectPaymentMethods,
  updateDefaultPaymentMethodThunk,
  updatePaymentMethodFormState,
  setShowPaymentMethodDetails,
} from "./PaymentsSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import CreatePaymentMethod from './CreatePaymentMethod';
import { FaCreditCard, FaPlus } from 'react-icons/fa';

const ManagePaymentMethod = ({ stripeCustomerId }) => {
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const dispatch = useDispatch();
    const customerPaymentMethods = useSelector(selectPaymentMethods);
    const showDetails = useSelector(state => state.payments.showPaymentMethodDetails);
    const [showModal, setShowModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('');
    
    // Get default payment method
    const defaultMethod = customerPaymentMethods.find(method => method.isDefault) || 
                         (customerPaymentMethods.length > 0 ? customerPaymentMethods[0] : null);

    useEffect(() => {
        setAccessToken(accessToken);
        if (stripeCustomerId) {
            dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId }));
        }
    }, [dispatch, stripeCustomerId, accessToken]);

    const handleToggleDetails = () => {
        dispatch(setShowPaymentMethodDetails(!showDetails));
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedMethod(value);
        dispatch(updatePaymentMethodFormState({ field: 'paymentMethodId', value }));
    };

    const handleSetDefault = async () => {
        if (selectedMethod && stripeCustomerId) {
            console.log('Selected method in component:', selectedMethod);
            console.log('Stripe customer ID in component:', stripeCustomerId);
            try {
                setAccessToken(accessToken);
                // Send the raw payment method ID string directly
                await dispatch(updateDefaultPaymentMethodThunk({
                    id: stripeCustomerId,
                    defaultPaymentMethodId: selectedMethod // This should be a raw string like 'pm_123456'
                })).unwrap();
                // Refresh payment methods
                dispatch(fetchPaymentMethodsByCustomerThunk({ customerId: stripeCustomerId }));
            } catch (error) {
                console.error('Error setting default payment method:', error);
            }
        }
    };

    return (
        <Card className="m-2">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Payment Methods</h3>
                    <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={handleToggleDetails}
                    >
                        {showDetails ? 'Hide Details' : 'Show Details'}
                    </Button>
                </div>
                
                {!showDetails ? (
                    <div className="d-flex align-items-center">
                        <FaCreditCard className="me-2" />
                        <span>
                            {defaultMethod 
                                ? `${defaultMethod.card.brand} **** **** **** ${defaultMethod.card.last4}` 
                                : 'No payment method on file'}
                        </span>
                    </div>
                ) : (
                    <>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="paymentMethod">
                                <Form.Label column sm="4">Select Payment Method</Form.Label>
                                <Col sm="8">
                                    <Form.Select 
                                        name="paymentMethod" 
                                        onChange={handleChange}
                                        value={selectedMethod}
                                    >
                                        <option value="">Select Payment Method</option>
                                        {customerPaymentMethods.map((method) => (
                                            <option key={method.id} value={method.id}>
                                                {method.card.brand} **** **** **** {method.card.last4}
                                                {method.isDefault ? ' (Default)' : ''}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            
                            <div className="d-flex justify-content-between">
                                <Button 
                                    variant="primary" 
                                    onClick={handleSetDefault}
                                    disabled={!selectedMethod}
                                >
                                    Set as Default
                                </Button>
                                
                                <Button 
                                    variant="success" 
                                    onClick={handleOpenModal}
                                >
                                    <FaPlus className="me-1" /> Add New Payment Method
                                </Button>
                            </div>
                        </Form>
                    </>
                )}
            </Card.Body>
            
            {/* Modal for adding a new payment method */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePaymentMethod />
                </Modal.Body>
            </Modal>
        </Card>
    );
}
export default ManagePaymentMethod;