import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import config from '../../config';

export default function SingleStudent() {
    const { authState, oktaAuth } = useOktaAuth();

    const id = useParams().id;

    const [student, setStudent] = useState({});

    useEffect(() => {
        const accessToken = oktaAuth.getAccessToken();

        fetch(`http://localhost:8080/api/users/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => response.json())
            .then(result =>
                setStudent(result))
            .catch(console.log)
    }, [id]);
    useEffect(() => {
        setFormState({
            ...student,
        })
    }, [student]);

    // form input to update Student
    const [formState, setFormState] = useState({
        ...student,
    });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    console.log(formState);
    // function handleSubmit(evt) {
    //     evt.preventDefault();

    //     const url = `http://localhost:7979/students/${id}`;
    //     const method = "PUT";

    //     const init = {
    //         method,
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(
    //             {
    //                 "id": id,
    //                 "firstName": formState.firstName,
    //                 "lastName": formState.lastName,
    //                 "email": formState.email,
    //                 "phone": formState.phone,
    //                 "address": {
    //                     "street1": formState.street1,
    //                     "street2": formState.street2,
    //                     "city": formState.city,
    //                     "state": formState.state,
    //                     "zipcode": formState.zipcode
    //                 },
    //                 "vip": formState.vip
    //             }
    //         )
    //     };

    //     fetch(url, init)
    //         .then(() => { return formState; })
    //         .then((data) => {
    //             console.log('/updateStudent: ', data);
    //             alert(`${data.firstName} successfully updated`);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }

    // function handleDelete() {
    //     fetch(`http://localhost:7979/students/${id}`, { method: "DELETE" })
    //         .then(() => alert(`${student.firstName} Deleted`))
    //         .then(goBack())
    //         .catch(error => console.log(error));
    // }

    function goBack() {
        document.location.replace(`/`);
    }
    return (
        <Container fluid>
            <Row >

                <Col md="11">
                    <Row className='m-3'>
                        <Col md="4">
                            <Card className="card-user">
                                <Card.Body>
                                    <div className="author">
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={"http://placecorgi.com/260/180"}
                                        />
                                        <h5 className="title">{student.displayName}</h5>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card className="card-user">
                                <Card.Header>
                                    <Card.Title tag="h5">{student.displayName}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    {/* <Form onSubmit={handleSubmit}> */}
                                    <Form>
                                        <Form.Group>
                                            <label htmlFor="exampleInputEmail1">
                                                Email address
                                            </label>
                                            <Form.Control
                                                name="email"
                                                value={formState.email ?? ""}
                                                onChange={handleChange}
                                                type="email" />
                                        </Form.Group>
                                        <Row className="pr-1">
                                            <Col md="6">
                                                <Form.Group>
                                                    <label>First Name</label>
                                                    <Form.Control
                                                        name="firstName"
                                                        value={formState.firstName ?? ""}
                                                        onChange={handleChange}
                                                        type="text"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md="6">
                                                <Form.Group>
                                                    <label>Last Name</label>
                                                    <Form.Control
                                                        name="lastName"
                                                        value={formState.lastName ?? ""}
                                                        onChange={handleChange}
                                                        type="text"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group>
                                            <label>Address</label>
                                            <Form.Control
                                                name="street1"
                                                value={formState.street1 ?? ""}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <label>City</label>
                                            <Form.Control
                                                name="city"
                                                value={formState.city ?? ""}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <label>State</label>
                                            <Form.Control
                                                name="state"
                                                value={formState.state ?? ""}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <label>Zip Code</label>
                                            <Form.Control
                                                name="zipcode"
                                                value={formState.zipcode ?? ""}
                                                onChange={handleChange}
                                                type="text" />
                                        </Form.Group>
                                        <Form.Group>
                                            <label>Phone</label>
                                            <Form.Control
                                                name="phone"
                                                value={formState.phone ?? ""}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                        </Form.Group>
                                        <Row className='my-3'>
                                            <div>
                                                <Button
                                                    className="btn-round mr-3"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    Update Student
                                                </Button>
                                                <Button
                                                    className="btn-round mx-3"
                                                    variant="danger"
                                                // onClick={() => handleDelete()}
                                                >
                                                    Delete Student
                                                </Button>
                                                <Button
                                                    className="btn-round ml-3"
                                                    variant="secondary"
                                                    onClick={() => goBack()}
                                                >
                                                    Go Back
                                                </Button>
                                            </div>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
};