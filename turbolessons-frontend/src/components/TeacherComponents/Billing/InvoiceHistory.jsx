import React, { useEffect } from "react";
import { Table, Button, Card, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';
import { fetchInvoicesBySubscriptionThunk } from './BillingSlice';
import { formatCurrency, formatTimestamp, capitalize } from '../../../util/formatters';

const InvoiceHistory = ({ subscriptionId }) => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const invoicesAdapter = useSelector((state) => state.billing.entities["invoices"]);
    const invoices = Object.values(invoicesAdapter?.entities || {});
    const loading = useSelector((state) => state.billing.loading);
    const error = useSelector((state) => state.billing.error);

    useEffect(() => {
        if (subscriptionId && authState?.isAuthenticated) {
            const fetchCustomerData = async () => {
                const accessToken = oktaAuth.getAccessToken();
                setAccessToken(accessToken);
                dispatch(fetchInvoicesBySubscriptionThunk({ subscriptionId }));
            };
            fetchCustomerData();
        }
    }, [subscriptionId, dispatch]);

    const safeFormatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        try {
            return formatTimestamp(timestamp);
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <Card className="mb-3">
                <Card.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mb-3">
                <Card.Body>
                    <Alert variant="danger">{error}</Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <h3>Invoice History</h3>
                {invoices.length === 0 ? (
                    <Alert variant="info">No invoices found.</Alert>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Invoice Number</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices?.map((invoice, index) => (
                                <tr key={`invoice-${invoice.id || index}`}>
                                    <td>{invoice.id || 'N/A'}</td>
                                    <td>{formatCurrency((invoice.amount_due || 0) / 100)}</td>
                                    <td>{safeFormatDate(invoice.created)}</td>
                                    <td>{capitalize(invoice.paid ? 'Paid' : 'Unpaid')}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleDownloadInvoice(invoice.id)}
                                        >
                                            Download
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}

export default InvoiceHistory;
