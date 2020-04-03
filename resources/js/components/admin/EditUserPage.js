import React, {useEffect, useState} from 'react';
import { Redirect} from "react-router-dom";
import { Container, Card, Col, Row } from "react-bootstrap";
import Endpoints from "../../config/Endpoints";
import UserForm from './UserForm';
import axios from 'axios';

const EditUserPage = (props) => {

    const id = props.match.params.id;
    const [userData, setUserData] = useState(null);
    const [redirect, setRedirect] = useState(null);

    const onSubmit = (userData) => {

        userData = {id, ...userData};

        axios.post(Endpoints.UPSERT_USER, userData)
            .then(({data}) => {

                /**
                 * Success response
                 * set state data
                 */
                console.log('Successfully UPDATED user!', data);
                setRedirect('/admin/users');

            })
            .catch(error => {

                console.error('EditUserPage: update user', error);
                alert("There was an error while fetching requests");
            });
    };

    const getUserData = () => {

        /**
         * Get data from endpoint
         */
        axios.get(`${Endpoints.USER_DATA}${id}`)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                setUserData(data);
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });

    };


    useEffect(() => {
        getUserData();
    }, [])

    if (redirect) {
        return <Redirect to={redirect}/>;
    }


    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={7}>
                    <Card className={'p-5'}>
                        <Card.Title>
                            Edit User
                        </Card.Title>

                        <UserForm
                            onSubmit={onSubmit}
                            userData={userData}
                        />

                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export {EditUserPage as default}
