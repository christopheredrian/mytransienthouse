import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import UserListItem from './UserListItem';
import Endpoints from "../../config/Endpoints";

import {Button, Container, Row, Col, Card, Table, Pagination} from 'react-bootstrap';

const UserList = (props) => {

    const [usersData, setUsersData] = useState({
        data: [],
        perPage: 1,
        currentPage: 1,
        lastPage: 1,
        total: 0,
        fromPage : 1,
        toPage: 1,
    });

    const getUsersData = (currentPage) => {

        /**
         * Get data from endpoint
         */
        axios.get(`${Endpoints.USERS_DATA}?page=${currentPage}`)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                console.log('server data', data)

                setUsersData({
                    data: data.data,
                    perPage: data.per_page,
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    total: data.total
                });
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });

    };

    const renderPaginationLinks = () => {
        let items = [];
        for (let number = 1; number <= usersData.lastPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === usersData.currentPage}
                    onClick={() => getUsersData(number)}
                >
                    {number}
                </Pagination.Item>,
            );
        }

        return (<Pagination>{items}</Pagination>)
    }

    useEffect(() => {
        getUsersData(usersData.currentPage);
    }, [])

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className={'p-5'}>
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
                                    !Array.isArray(usersData.data) && usersData.data.length === 0 ? (
                                        <tr className="justify-content-center">
                                            <td colSpan="3">No users.</td>
                                        </tr>
                                    ) : (
                                        usersData.data.map((user) => {
                                            return <UserListItem key={user.id} {...user} />
                                        })
                                    )
                                }
                                </tbody>
                            </Table>
                        </Row>

                        <Row>
                            <Col>
                                {
                                    renderPaginationLinks()
                                }
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
        </Container>
    );

};

export {UserList as default};
