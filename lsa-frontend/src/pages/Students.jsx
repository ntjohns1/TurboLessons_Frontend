import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import PortalNav from '../components/PortalNav';
import StudentTable from '../components/Students/StudentTable';
import config from '../config';
import AddStudent from '../components/Students/AddStudent';


export default function Students() {
    return (
        <Container className='p-4 my-4'>
            <PortalNav />
            <StudentTable />
            <AddStudent />
        </Container>
    )
};