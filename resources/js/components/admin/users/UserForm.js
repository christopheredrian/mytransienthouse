import React, {useEffect, useState} from 'react';
import {Button, Alert, Form, Modal} from "react-bootstrap";

import Endpoints from "../../../config/Endpoints";

const UserForm = (props, passwordFieldForProduction) => {


    // temporary, setting of password for production
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        name: '',
        role: '',
        email: ''
    });

    const upsertUser = (userData) => {

        // temporary, setting of password for production
        axios.post(Endpoints.UPSERT_USER, {
            ...userData,
            password
        }).then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                const operation = userData.id ? 'UPDATED' : 'CREATED';
                console.log(`Successfully ${operation} user!`, data);

                props.closeUserFormAfterSubmit();
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!userData.name || !userData.role || !userData.email) {
            setError('Please provide user name, email, and role.');
        } else {
            const data = {
                ...userData,
                id: props.userData ? props.userData.id : undefined
            };

            upsertUser(data)
        }
    };

    useEffect(() => {
        if (props.userData) {
            setUserData({
                name: props.userData.name,
                role: props.userData.role,
                email: props.userData.email
            });
        }
    }, [props.userData]);

    return (
        <Form onSubmit={onSubmit}>
            {error && (
                <Alert key={error} variant='danger'>
                    {error}
                </Alert>
            )}

            <Form.Group controlId="formName">
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={userData.name || ''}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={userData.email || ''}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
                <Form.Text className="text-muted">
                    Must be unique for each user.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Role</Form.Label>
                <Form.Control
                    as="select"
                    value={userData.role === '' ? 'Choose role...' : userData.role}
                    onChange={(e) => setUserData({...userData, role: e.target.value})}
                >
                    <option disabled>Choose role...</option>
                    <option value="customer">Customer</option>
                    <option value="business_owner">Business Owner</option>
                    <option value="admin">Admin</option>
                </Form.Control>
            </Form.Group>

            {
                (props.passwordFieldForProduction === true && !props.userData) && (
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password || ''}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                )
            }

            <Modal.Footer>
                <Button onClick={props.onClose} variant="secondary" type="button">
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save User
                </Button>
            </Modal.Footer>
        </Form>
    )
};

export {UserForm as default}
