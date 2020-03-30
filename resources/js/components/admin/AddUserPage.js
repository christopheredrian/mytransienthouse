import React from 'react';
import { Redirect } from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import Endpoints from "../../config/Endpoints";
import UserForm from './UserForm';

const AddUserPage = () => {
    const addUser = (userData) => {
        axios.post(Endpoints.CREATE_USER, userData)
            .then(({ data }) => {
                /**
                 * Success response
                 * set state data
                 */
                console.log(data);
                <Redirect to="/users" />
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    }

    return (
        <Row className="justify-content-center">
            <Col md={8}>
                <Card className={'p-5'}>
                    <Card.Title>
                        Add User
                    </Card.Title>

                    <UserForm
                        addUser={addUser}
                    />

                </Card>
            </Col>
        </Row>
    );
}

export { AddUserPage as default }
