import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Alert, Form} from "react-bootstrap";

const UserForm = (props) => {

    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!userName || !userRole || !userEmail) {
            setError('Please provide user name, role and email');
        } else {
            const userData = {
                name: userName,
                role: userRole,
                email: userEmail,
            }

            props.onSubmit(userData);
        }
    }

    useEffect(() => {
        if (props.userData) {
            setUserName(props.userData.name);
            setUserRole(props.userData.role);
            setUserEmail(props.userData.email);
        }
    }, [props.userData])

    return (
        <div>

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
                        value={userName || ''}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>
                        Email address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={userEmail || ''}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Email must be unique for each user.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>
                        Role
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter role"
                        value={userRole || ''}
                        onChange={(e) => setUserRole(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        User role in the system
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save User
                </Button>
            </Form>


            {/*<form onSubmit={onSubmit}>*/}

                {/*<input*/}
                    {/*className="text-input"*/}
                    {/*type="text"*/}
                    {/*placeholder="Name"*/}
                    {/*value={userName || ''}*/}
                    {/*onChange={(e) => setUserName(e.target.value)}*/}
                {/*/>*/}
                {/*<input*/}
                    {/*className="text-input"*/}
                    {/*type="text"*/}
                    {/*placeholder="Role"*/}
                    {/*value={userRole || ''}*/}
                    {/*onChange={(e) => setUserRole(e.target.value)}*/}
                {/*/>*/}
                {/*<input*/}
                    {/*className="text-input"*/}
                    {/*type="email"*/}
                    {/*placeholder="Email"*/}
                    {/*value={userEmail || ''}*/}
                    {/*onChange={(e) => setUserEmail(e.target.value)}*/}
                {/*/>*/}
                {/*<button className="button">Save user</button>*/}
            {/*</form>*/}
        </div>
    )
}

export {UserForm as default}
