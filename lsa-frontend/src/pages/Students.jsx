import React from 'react';
import { Container } from 'react-bootstrap';
import PortalNav from '../components/PortalNav';
import StudentTable from '../components/Students/StudentTable';

export default function Students() {
    return (
        <Container className='p-4 my-4'>
            <PortalNav />
            <StudentTable />
        </Container>
    )
};