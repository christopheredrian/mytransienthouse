import React, { useState } from 'react';
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import {ListGroup} from 'react-bootstrap';

const UserListItem = ({name, id, email, role}) => {

    const [redirect, setRedirect] = useState(null);

    const triggerRedirect = (e, id) => {
        e.preventDefault();

        setRedirect(`/admin/users/edit/${id}`);
    }

    if (redirect) {
        return <Redirect to={redirect}/>;
    }

    return (
        <tr key={id} onClick={(e) => triggerRedirect(e, id)}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
        </tr>
    )
}

export {UserListItem as default}
