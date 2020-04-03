import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Alert, Form} from "react-bootstrap";

const UserForm = (props) => {

    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        role: '',
        email: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (!userData.name || !userData.role || !userData.email) {
            setError('Please provide user name, email, and role.');
        } else {
            const data = {
                ...userData
            }

            props.onSubmit(data);
        }
    }

    useEffect(() => {
        if (props.userData) {
            setUserData({
                name: props.userData.name,
                role: props.userData.role,
                email: props.userData.email
            });
        }
    }, [props.userData])

    return (
        <Form onSubmit={onSubmit}>
            {error && (
                <Alert key={error} variant='danger'>
                    {error}
                </Alert>
            )}

            <Form.Group controlId="formName">
                <Form.Label>
                    User name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={userData.name || ''}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>
                    Email address
                </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={userData.email || ''}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <Form.Text className="text-muted">
                    Email must be unique for each user.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Role</Form.Label>
                <Form.Control
                    as="select"
                    value={userData.role === '' ? 'Choose role...' : userData.role}
                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                >
                    <option disabled>Choose role...</option>
                    <option value="customer">Customer</option>
                    <option value="businessowner">Business Owner</option>
                    <option value="admin">Admin</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
                Save User
            </Button>
        </Form>
    )
}

export {UserForm as default}
