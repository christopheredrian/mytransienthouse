import React from 'react';

const UserListItem = ({ user, onRowClick }) => {
    return (
        <tr key={user.id} onClick={onRowClick}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
        </tr>
    )
}

export {UserListItem as default}
