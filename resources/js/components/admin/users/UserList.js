import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';

import Endpoints from "../../../config/Endpoints";

import UsersTable from './UsersTable';
import FormModal from './FormModal';


const UserList = (props) => {

    const [showUserForm, setShowUserForm] = useState(false);
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

    const showEditUserForm = (data) => {
        setUserData(data);
        setShowUserForm(true);
    }

    const closeUserForm = () => {
        setShowUserForm(false);
        setUserData(null);
    }

    const closeUserFormAfterSubmit = () => {
        closeUserForm();
        getUsersData(usersData.currentPage);
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
                                onClick={() => setShowUserForm(true)}>
                                Add User
                            </Button>
                        </Card.Text>
                        <br/>
                        <UsersTable
                            usersData={usersData}
                            showEditUserForm={showEditUserForm}
                            onPageNumberClick={getUsersData}
                        />
                        <FormModal
                            userData={userData}
                            showUserForm={showUserForm}
                            onClose={closeUserForm}
                            closeUserFormAfterSubmit={closeUserFormAfterSubmit}
                        />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export {UserList as default};
