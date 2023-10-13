import React from 'react';
import { Container } from 'react-bootstrap';
import PortalNav from '../../components/PortalNav';
import StudentTable from '../../components/TeacherComponents/Students/StudentTable';

export default function Students() {
    return (
        <Container>
            <PortalNav />
            <StudentTable />
        </Container>
    )
};