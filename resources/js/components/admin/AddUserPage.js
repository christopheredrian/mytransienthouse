import React, {useState} from 'react';
import { Redirect} from "react-router-dom";
import { Container, Card, Col, Row } from "react-bootstrap";
import Endpoints from "../../config/Endpoints";
import UserForm from './UserForm';
import axios from 'axios';

const AddUserPage = () => {

    const [redirect, setRedirect] = useState(null);

    const onSubmit = (userData) => {

        axios.post(Endpoints.CREATE_USER, userData)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                console.log('Successfully ADDED user!', data);
                setRedirect('/admin/users');

            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    };

    if (redirect) {
        return <Redirect to={redirect}/>;
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={7}>
                    <Card className={'p-5'}>
                        <Card.Title>
                            Add User
                        </Card.Title>

                        <UserForm
                            onSubmit={onSubmit}
                        />

                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export {AddUserPage as default}
