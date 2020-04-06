import React from 'react';
import {Row, Col, Table} from 'react-bootstrap';

import TableItem from './TableItem';
import PaginationLinks from '../users/PaginationLinks';

const DataTable = ({usersData, showEditUserForm, onPageNumberClick}) => {

    return (
        <div>
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
                        !Array.isArray(usersData.data) || usersData.data.length === 0 ? (
                            <tr className="justify-content-center">
                                <td colSpan="3">No users.</td>
                            </tr>
                        ) : (
                            usersData.data.map((user) => {
                                return <TableItem
                                    key={user.id}
                                    user={user}
                                    onRowClick={() => showEditUserForm(user)}
                                />
                            })
                        )
                    }
                    </tbody>
                </Table>
            </Row>

            {
                !Array.isArray(usersData.data) || usersData.data.length === 0 ? (
                    <div></div>
                ) : (
                    <Row>
                        <Col>
                            <div className="float-left">
                                <p>
                                    Showing {usersData.fromPage} to {usersData.toPage} of {usersData.total} users
                                </p>
                            </div>
                        </Col>
                        <Col>
                            <div className="float-right">
                                <PaginationLinks
                                    usersData={usersData}
                                    onPageNumberClick={onPageNumberClick}
                                />
                            </div>
                        </Col>
                    </Row>
                )
            }
        </div>
    )
};

export {DataTable as default}
