import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import Notifications from '../../components/StudentComponents/Dashboard/Notifications';
import LessonOverview from '../../components/StudentComponents/Dashboard/LessonOverview';
import ProfileOverview from '../../components/StudentComponents/Dashboard/ProfileOverview';
import SubscriptionOverview from '../../components/StudentComponents/Dashboard/SubscriptionOverview';

export default function StudentDashboard() {
    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    <Row xs={10} style={{ backgroundColor: '#F4F4F5' }}>

                        <Col xs={6}>
                            <ProfileOverview />
                        </Col>
                        <Col xs={6}>
                            <Notifications />
                            <LessonOverview />
                            <SubscriptionOverview />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}