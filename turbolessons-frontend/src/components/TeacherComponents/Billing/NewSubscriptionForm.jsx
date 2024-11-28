import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomerThunk } from "./BillingSlice";


function NewSubscriptionForm() {
    const dispatch = useDispatch();
    const handleCreateStripeCustomer = () => {
        dispatch(createCustomerThunk(
            
        ))
    }
    return (
        <Form>
            <Row className='m-2'>
                <Col>
                    <Card>
                        <Card.Title className='mt-3 p-1 text-center'>Subscription Status</Card.Title>
                        <Card.Body>
                            <Card.Text className='p-1 text-center'>
                                <Row>
                                    <Col>
                                        Weekly Lesson - 60min
                                    </Col>
                                    <Col>
                                        $60
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='m-2'>
                <Col className='d-flex justify-content-center'>
                    <Button className='w-100'>Card</Button>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Button className='w-100'>Bank Account</Button>
                </Col>
            </Row>
            <Row className='m-2'>
                <Col>
                    <Form.Control placeholder="CardNumber" />
                </Col>
            </Row>
            <Row className='m-2'>
                <Col>
                    <Form.Control placeholder="Expiration Date" />
                </Col>
                <Col>
                    <Form.Control placeholder="Security Code" />
                </Col>
            </Row>
            <Row className='m-2'>
                <Col>
                    <Form.Select placeholder="Country">
                        <option>US</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                        <option>UK</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Control placeholder="Zip Code" />
                </Col>
            </Row>
        </Form>
    );
}

export default NewSubscriptionForm;