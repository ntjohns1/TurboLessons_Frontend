import React from 'react';
import { Container, Card, Button } from "react-bootstrap";

export default function Unauthorized() {
  return (
    <Container>
        <Card>
            <Card.Header className='text-center'>
                An Authorization Error Has Occurred. Please Try Again or Contact an Admin.
            </Card.Header>
        </Card>
    </Container>
  );
};