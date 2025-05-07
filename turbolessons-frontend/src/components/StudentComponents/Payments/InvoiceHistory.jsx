import React from 'react';
import { Card } from 'react-bootstrap';

const InvoiceHistory = () => {
    return (
        <Card>
            <Card.Title>Invoice History</Card.Title>
            <Card.Body>

                <ul>
                    <li>Invoice 1</li>
                    <li>Invoice 2</li>
                    <li>Invoice 3</li>
                </ul>

            </Card.Body>
        </Card>
    );
};

export default InvoiceHistory;
