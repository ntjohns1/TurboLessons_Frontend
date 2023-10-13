import React from 'react';
import { Container } from 'react-bootstrap';
import PortalNav from '../../components/PortalNav';
import NewLesson from '../../components/TeacherComponents/Lessons/NewLesson.jsx'
export default function Students() {
    return (
        <Container>
            <PortalNav />
            <NewLesson/>
        </Container>
    )
};