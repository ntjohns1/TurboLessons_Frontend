import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import Notifications from '../../components/StudentComponents/Dashboard/Notifications';
import LessonOverview from '../../components/StudentComponents/Dashboard/LessonOverview';

export default function StudentDashboard() {
    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    <Row xs={10} style={{ backgroundColor: '#F4F4F5' }}>
                        <Col xs={6}>
                            <Row>
                                <LessonOverview />
                            </Row>
                            <Row>
                                <LessonOverview />
                            </Row>
                        </Col>
                        <Col xs={6}>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}