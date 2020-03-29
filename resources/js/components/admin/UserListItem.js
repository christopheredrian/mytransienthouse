import React from 'react';
import { ListGroup } from 'react-bootstrap';

const UserListItem = ({ name, id, email }) => {
    return (
        <ListGroup.Item key={id}>
            <div>ID: {id}</div>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
        </ListGroup.Item>
    )
}

export { UserListItem as default }
