import React from 'react';
import { Card } from 'react-bootstrap';

const InvoiceHistory = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Invoice History</Card.Title>
                <Card.Text>
                    <ul>
                        <li>Invoice 1</li>
                        <li>Invoice 2</li>
                        <li>Invoice 3</li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default InvoiceHistory;