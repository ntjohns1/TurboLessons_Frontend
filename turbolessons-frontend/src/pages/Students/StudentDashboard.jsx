import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import Notifications from '../../components/StudentComponents/Dashboard/Notifications';
import NextLessonWidget from '../../components/StudentComponents/Dashboard/NextLessonWidget';
import ProfileOverview from '../../components/StudentComponents/Dashboard/ProfileOverview';
import SubscriptionOverview from '../../components/StudentComponents/Dashboard/SubscriptionOverview';
import LibraryPreview from '../../components/StudentComponents/Dashboard/LibraryPreview';
import Messenger from '../Students/Messenger';

// Custom CSS for equal height cards
const equalHeightStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
};

const cardBodyStyle = {
    flex: '1 1 auto' // This makes the card body expand to fill available space
};

export default function StudentDashboard() {
    return (
        <Container fluid>

                    {/* First row of widgets */}
                    <Row style={{ backgroundColor: '#F4F4F5' }}>
                        <Col xs={6} className="d-flex">
                            <div style={{ width: '100%' }}>
                                <NextLessonWidget />
                            </div>
                        </Col>
                        <Col xs={6} className="d-flex">
                            <div style={{ width: '100%' }}>
                                <SubscriptionOverview />
                            </div>
                        </Col>
                        {/* <Col xs={4} className="d-flex">
                            <div style={{ width: '100%' }}>
                                <Notifications />
                            </div>
                        </Col> */}
                    </Row>
                    
                    {/* Second row with library and messenger */}
                    <Row style={{ backgroundColor: '#F4F4F5' }}>
                        <Col xs={6} className="d-flex">
                            <div style={{ width: '100%' }}>
                                <LibraryPreview />
                            </div>
                        </Col>
                        <Col xs={6} className="d-flex">
                            <div style={{ width: '100%' }}>
                                <Messenger />
                            </div>
                        </Col>
                    </Row>

        </Container>
    )
}