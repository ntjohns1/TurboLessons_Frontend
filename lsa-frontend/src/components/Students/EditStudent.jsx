import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaRegWindowClose } from "react-icons/fa";
import config from '../../config';

export default function EditStudent({ student, formState, setIsUpdate, setFormState, oktaAuth, id }) {

    useEffect(() => {
        setFormState({
            ...student,
        })
    }, [student]);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    console.log(formState);
    function handleSubmit(evt) {
        evt.preventDefault();

        const url = `http://localhost:8080/api/users/${id}`;
        const accessToken = oktaAuth.getAccessToken();
        const method = "PUT";

        const init = {
            method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    "login": formState.login,
                    "displayName": formState.displayName,
                    "firstName": formState.firstName,
                    "middleName": formState.middleName,
                    "lastName": formState.lastName,
                    "email": formState.email,
                    "mobilePhone": formState.mobilePhone,
                    "primaryPhone": formState.primaryPhone,
                    "streetAddress": formState.streetAddress,
                    "city": formState.city,
                    "state": formState.state,
                    "zipCode": formState.zipCode,
                    "userType": formState.userType
                }
            )
        };

        fetch(url, init)
            .then(() => { return formState; })
            .then((data) => {
                console.log('/updateStudent: ', data);
                alert(`${data.firstName} successfully updated`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // function handleDelete() {
    //     fetch(`http://localhost:7979/students/${id}`, { method: "DELETE" })
    //         .then(() => alert(`${student.firstName} Deleted`))
    //         .then(goBack())
    //         .catch(error => console.log(error));
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const url = `http://localhost:8080/api/users/${id}`;
    //     const accessToken = oktaAuth.getAccessToken();
    //     await fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`,
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(
    //             {
    //                 "login": formState.login,
    //                 "displayName": formState.displayName,
    //                 "firstName": formState.firstName,
    //                 "middleName": formState.middleName,
    //                 "lastName": formState.lastName,
    //                 "email": formState.email,
    //                 "mobilePhone": formState.mobilePhone,
    //                 "primaryPhone": formState.primaryPhone,
    //                 "streetAddress": formState.streetAddress,
    //                 "city": formState.city,
    //                 "state": formState.state,
    //                 "zipCode": formState.zipCode,
    //                 "userType": formState.userType
    //             }
    //         )
    //     })
    //         .then(response => {
    //             if (response.status === 204 || response.status === 200) {
    //                 return response.json();
    //             }
    //             return Promise.reject(`Didn\'t receive expected status: 204, status received: ${response.status}`);
    //         })
    //         .then(() => {
    //             alert('Successfully Updated Lesson Event');
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });

    // };

    return (
        <Card className="card-user">
            <Card.Header>
                <Row>
                    <Col md='10'>
                        <Card.Title tag="h5">{student.displayName}</Card.Title>
                    </Col>
                    <Col md='2'>
                        <Button
                            className="btn-round ml-3"
                            variant="secondary"
                            onClick={() => setIsUpdate(false)}
                        >
                            <FaRegWindowClose />
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Email
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="email"
                                value={formState.email ?? ""}
                                onChange={handleChange}
                                type="email" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            First Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="firstName"
                                value={formState.firstName ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Middle Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="middleName"
                                value={formState.middleName ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Last Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="lastName"
                                value={formState.lastName ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Mobile Phone
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="mobilePhone"
                                value={formState.mobilePhone ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Home Phone
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="homePhone"
                                value={formState.primaryPhone ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Address
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="streetAddress"
                                value={formState.streetAddress ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            City
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="city"
                                value={formState.city ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            State
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="state"
                                value={formState.state ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Zip Code
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="zipCode"
                                value={formState.zipCode ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        as='input'
                        className='my-2'
                        type='submit'
                    />
                </Form>
            </Card.Body>
        </Card>
    )
};