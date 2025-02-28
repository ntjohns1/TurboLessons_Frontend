import React, { useEffect } from "react";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';   
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';

const InvoiceHistory = () => { 
    // fetch invoices by customer id
    // if invoices exist, display them in a table
    // if no invoices exist, display a message saying no invoices exist
    // if error fetching invoices, display an error message
    
    return (
        <Card className="mb-3">
            <Card.Body>
                <h3>Invoice History</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>INV-1234</td>
                            <td>$100.00</td>
                            <td>01/01/2021</td>
                            <td>Paid</td>
                            <td><Button>Download</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default InvoiceHistory;
