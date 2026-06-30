import React from "react";
import { Table, Card, Spinner, Alert } from "react-bootstrap";
import { useListInvoicesByCustomerQuery } from "../../../service/billingApi";
import { formatCurrency, formatTimestamp, capitalize } from '../../../util/formatters';

const InvoiceHistory = ({ customerId }) => {
    const {
        data: invoices = [],
        isLoading: loading,
        isError,
        error,
    } = useListInvoicesByCustomerQuery(customerId, { skip: !customerId });

    const safeFormatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        try {
            return formatTimestamp(timestamp);
        } catch (e) {
            console.error('Error formatting date:', e);
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <Card className="m-2">
                <Card.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Card.Body>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="m-2">
                <Card.Body>
                    <Alert variant="danger">{error?.data?.message || 'Error loading invoices'}</Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="m-2">
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
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice, index) => (
                                <tr key={`invoice-${invoice.id || index}`}>
                                    <td>{invoice.id || 'N/A'}</td>
                                    <td>{formatCurrency((invoice.amount_due || 0) / 100)}</td>
                                    <td>{safeFormatDate(invoice.created)}</td>
                                    <td>{capitalize(invoice.paid ? 'Paid' : 'Unpaid')}</td>
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
