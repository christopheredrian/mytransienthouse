import React from 'react';
import { Link } from "react-router-dom";
import { ListGroup } from 'react-bootstrap';

const UserListItem = ({ name, id, email, role }) => {
    return (
        <Link to={`/admin/users/edit/${id}`}>
            <ListGroup.Item key={id}>
                <div>Name: {name}</div>
                <div>Role: {role}</div>
                <div>Email: {email}</div>
            </ListGroup.Item>
        </Link>
    )
}

export { UserListItem as default }
