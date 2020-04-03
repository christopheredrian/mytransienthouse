import React, {useEffect, useState} from 'react';
import UserListItem from './UserListItem';
import UserForm from './UserForm';
import Endpoints from "../../config/Endpoints";

import {Button, Container, Row, Col, Card, Table, Pagination, Modal} from 'react-bootstrap';

const UserList = (props) => {

    const [userFormShow, setUserFormShow] = useState(false);
    const [userData, setUserData] = useState(null);
    const [usersData, setUsersData] = useState({
        data: [],
        perPage: 1,
        currentPage: 1,
        lastPage: 1,
        total: 0,
        fromPage: 1,
        toPage: 1,
    });

    const closeUserForm = (data) => {
        setUserData(null);
        getUsersData(usersData.currentPage);
        setUserFormShow(false);
    }

    const showEditUserForm = (data) => {
        setUserData(data);
        setUserFormShow(true);
    }

    const UsersTable = () => {
        return (
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
                                return <UserListItem
                                    key={user.id}
                                    user={user}
                                    onRowClick={() => showEditUserForm(user)}
                                />
                            })
                        )
                    }
                    </tbody>
                </Table>

                <PaginationLinks />
            </Row>
        )
    }

    const PaginationLinks = () => {
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

    const FormModal = ({show, onHide}) => {
        return (
            <Modal
                show={show}
                onHide={onHide}
                size="md"
                aria-labelledby="user-form-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="user-form-modal">
                        {userData ? 'Edit User' : 'Add User'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm
                        userData={userData}
                        closeUserForm={() => setUserFormShow(false)}
                        afterSubmit={closeUserForm}
                    />
                </Modal.Body>
            </Modal>
        );
    }

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

    useEffect(() => {
        getUsersData(usersData.currentPage);
    }, [])

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className={'p-5'}>
                        <Card.Title>
                            Users
                        </Card.Title>

                        <Card.Text>
                            <Button
                                variant="primary"
                                onClick={() => setUserFormShow(true)}>
                                Add User
                            </Button>
                        </Card.Text>

                        <br/>

                        <UsersTable />

                        <FormModal
                            show={userFormShow}
                            onHide={closeUserForm}
                        />

                    </Card>
                </Col>
            </Row>
        </Container>
    );

};

export {UserList as default};
