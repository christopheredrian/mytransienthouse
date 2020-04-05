import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';

import Endpoints from "../../../config/Endpoints";

import TableToolBar from './TableToolBar';
import UsersTable from './UsersTable';
import FormModal from './FormModal';

const UserList = (props) => {

    const defaultUsersPerPage = 5;

    const [usersPerPage, setUsersPerPage] = useState(defaultUsersPerPage);
    const [searchFilter, setSearchFilter] = useState(null);
    const [showUserForm, setShowUserForm] = useState(null);
    const [userData, setUserData] = useState(null);
    const [usersData, setUsersData] = useState({
        data: [],
        currentPage: 1,
        lastPage: 1,
        total: 0,
        fromPage: 1,
        toPage: 1,
    });

    const showEditUserForm = (data) => {
        setUserData(data);
        setShowUserForm(true);
    };

    const closeUserForm = () => {
        setShowUserForm(false);
        setUserData(null);
    };

    const closeUserFormAfterSubmit = () => {
        closeUserForm();
        getUsersData(usersData.currentPage, usersPerPage);
    };

    const changeUsersPerPage = (perPage) => {
        setUsersPerPage(parseInt(perPage));
    };

    const onPageNumberClick = (pageNumber) => {
        getUsersData(pageNumber, usersPerPage)
    };

    const onSearchChange = (searchFilter) => {
        setSearchFilter(searchFilter);
    };

    const getUsersData = (page, perPage, filter = null) => {

        /**
         * Get data from endpoint
         */
        axios.get(`${Endpoints.USERS_DATA}`, {
            params: {
                page,
                perPage,
                filter
            }
        }).then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */

                setUsersData({
                    data: data.data,
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    total: data.total,
                    fromPage: data.from,
                    toPage: data.to
                });
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });

    };

    useEffect(() => {
        getUsersData(usersData.currentPage, usersPerPage);
    }, []);

    useEffect(() => {
        // Always start at first page when usersPerPage is changed
        // Consult with Chris
        getUsersData(1, usersPerPage, searchFilter);
    }, [usersPerPage, searchFilter]);

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className={'p-5'}>
                        <Card.Title>
                            <h1>Users</h1>
                        </Card.Title>
                        <TableToolBar
                            usersPerPage={usersPerPage}
                            changeUsersPerPage={changeUsersPerPage}
                            setShowUserForm={setShowUserForm}
                            searchFilter={searchFilter}
                            onSearchChange={onSearchChange}
                        />
                        <UsersTable
                            usersData={usersData}
                            onPageNumberClick={onPageNumberClick}
                            showEditUserForm={showEditUserForm}
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
