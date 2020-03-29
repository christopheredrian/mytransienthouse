import React, { useState } from 'react';
import axios from 'axios';

import {
    Button, Row, Col, Container, Card,
    ListGroup
} from 'react-bootstrap';

const Users = () => {
    const [usersData, setUsersData] = useState([]);

    const getUsersData = () => {

        /**
         * Get data from endpoint
         */
        axios.get('/api/users')
            .then(({ data }) => {
                /**
                 * Success response
                 * set state data
                 */
                setUsersData(data);
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });

    };

    return (
        <Row className="justify-content-center mt-5">
            <Col md={8}>
                <Card className={'p-5'}>
                    <Card.Title>
                        Users
                    </Card.Title>
                    <Card.Text>
                        Click button to get users data from server
                    </Card.Text>
                    <Card.Text>
                        <Button size={"sm"} onClick={getUsersData}>Get user data (via AJAX)</Button>
                    </Card.Text>

                    <ListGroup>
                        {
                            Array.isArray(usersData) &&
                            (usersData.length > 0) &&
                            usersData.map(({ name, id, email }) => {
                                return <ListGroup.Item key={id}>{id}, {name}, {email}</ListGroup.Item>
                            })
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export { Users as default }
