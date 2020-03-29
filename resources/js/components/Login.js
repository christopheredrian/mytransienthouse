import React, {useState} from "react";
import axios from "axios";
import {Container, Button, Card, Col, ListGroup, Row, Form} from "react-bootstrap";

const Login = () => {

    const [formData, setFormData] = useState({
        email: undefined,
        password: undefined,
    });


    const attemptLogin = () => {

        /**
         * Get data from endpoint
         */
        axios.get('/test_data')
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                setTestData(data);

            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });

    };

    const onSubmit = () => {
        alert(JSON.stringify(formData));
    };

    const onSimpleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <Card>
                        <Card.Header>Login</Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={onSimpleFormChange}
                                        value={formData.email}
                                        name={'email'}
                                    />
                                    {/*<Form.Text className="text-muted">*/}
                                    {/*    We'll never share your email with anyone else.*/}
                                    {/*</Form.Text>*/}
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name={'password'}
                                        onChange={onSimpleFormChange}
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
