import React from 'react';
import { Card } from 'react-bootstrap'; 

const ProfileOverview = () => {
    const student = {
        displayName: "John Doe",
        email: "john.doe@example.com",
        firstName: "John",
        middleName: "Doe",
        lastName: "Doe", 
        mobilePhone: "123-456-7890",
        primaryPhone: "123-456-7890",
        streetAddress: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
    }
    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>Profile Overview</Card.Title>
                <Card.Text>Display Name: {student.displayName}</Card.Text>
                <Card.Text>Email: {student.email}</Card.Text>
                <Card.Text>First Name: {student.firstName}</Card.Text>
                <Card.Text>Middle Name: {student.middleName}</Card.Text>
                <Card.Text>Last Name: {student.lastName}</Card.Text>
                <Card.Text>Mobile Phone: {student.mobilePhone}</Card.Text>
                <Card.Text>Primary Phone: {student.primaryPhone}</Card.Text>
                <Card.Text>Street Address: {student.streetAddress}</Card.Text>
                <Card.Text>City: {student.city}</Card.Text>
                <Card.Text>State: {student.state}</Card.Text>
                <Card.Text>Zip Code: {student.zipCode}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default ProfileOverview;
