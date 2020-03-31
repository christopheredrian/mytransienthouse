import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserListItem from './UserListItem';
import Endpoints from "../../config/Endpoints";

import {
    Row, Col, Card,
    ListGroup
} from 'react-bootstrap';

const UserList = (props) => {

    const [usersData, setUsersData] = useState([]);

    const getUsersData = () => {

        /**
         * Get data from endpoint
         */
        axios.get(Endpoints.USERS_DATA)
            .then(({ data }) => {
                /**
                 * Success response
                 * set state data
                 */
                setUsersData(data);
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });

    };

    useEffect(() => {
        getUsersData();
    }, [])

    return (
        <Row className="justify-content-center">
            <Col md={8}>
                <Card className={'p-5'}>
                    <Card.Title>
                        Users
                    </Card.Title>
                    <div>
                        <Link to="/admin/users/create">
                            <button>Add User</button>
                        </Link>
                    </div>

                    <ListGroup>
                        {
                            !Array.isArray(usersData) &&
                                usersData.length === 0 ? (
                                    <div className="list-item list-item--message">
                                        <span>No users</span>
                                    </div>
                                ) : (
                                    usersData.map((user) => {
                                        return <UserListItem key={user.id} {...user} />
                                    })
                                )
                        }
                    </ListGroup>

                </Card>
            </Col>
        </Row>
    );

};

export { UserList as default };
