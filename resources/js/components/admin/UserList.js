import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import UserListItem from './UserListItem';
import Endpoints from "../../config/Endpoints";

import {Button, Container, Row, Col, Card, Table} from 'react-bootstrap';

const UserList = (props) => {

    const [usersData, setUsersData] = useState([]);

    const getUsersData = () => {

        /**
         * Get data from endpoint
         */
        axios.get(Endpoints.USERS_DATA)
            .then(({data}) => {
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

    useEffect(() => {
        getUsersData();
    }, [])

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={7}>
                    <Card className={'p-5'} >
                        <Row>
                            <Col xs={9}>
                                <Card.Title>
                                    Users
                                </Card.Title>
                            </Col>

                            <Col xs={3}>
                                <Link to="/admin/users/create">
                                    <Button variant="primary">Add User</Button>
                                </Link>
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Table striped bordered hover size="lg" responsive>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    !Array.isArray(usersData) &&
                                    usersData.length === 0 ? (
                                        <tr className="justify-content-center">
                                            <td colSpan="3">No users.</td>
                                        </tr>
                                    ) : (
                                        usersData.map((user) => {
                                            return <UserListItem key={user.id} {...user} />
                                        })
                                    )
                                }
                                </tbody>
                            </Table>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

};

export {UserList as default};
