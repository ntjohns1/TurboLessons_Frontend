import React from 'react';
import { Container, Modal, Row, Col } from 'react-bootstrap';
import InvoiceHistory from '../../components/StudentComponents/Payments/InvoiceHistory';
import CreatePaymentMethod from '../../components/StudentComponents/Payments/CreatePaymentMethod';
import CreateSubscription from '../../components/StudentComponents/Payments/CreateSubscription';
import CreateStripeAccount from '../../components/StudentComponents/Payments/CreateStripeAccount';
import SubscriptionDetail from '../../components/StudentComponents/Payments/SubscriptionDetail';
import ManagePaymentMethod from '../../components/StudentComponents/Payments/ManagePaymentMethod';  

const Payments = () => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <Container>
            <Row>             
                    <SubscriptionDetail /> 
                    <InvoiceHistory />
                    {/* <CreateSubscription />
                    <CreateStripeAccount /> */}
                    <ManagePaymentMethod />
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePaymentMethod showModal={showModal} setShowModal={setShowModal}/>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Payments;