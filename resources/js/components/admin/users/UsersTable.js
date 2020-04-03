import React from 'react';
import {Row, Table} from 'react-bootstrap';

import UserListItem from './UserListItem';
import PaginationLinks from './PaginationLinks';

const UsersTable = ({ usersData, showEditUserForm, onPageNumberClick}) => {
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
            <PaginationLinks
                usersData={usersData}
                onPageNumberClick={onPageNumberClick}
            />
        </Row>
    )
}

export { UsersTable as default }
