import React, { useState } from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';

import {
    Row, Col, Card,
    ListGroup
} from 'react-bootstrap';

const UserList = (props) => {

    return (
        <Row className="justify-content-center">
            <Col md={8}>
                <Card className={'p-5'}>
                    <Card.Title>
                        Users
                    </Card.Title>

                    <ListGroup>
                        {
                            !Array.isArray(props.users) &&
                            props.users.length === 0 ? (
                                <div className="list-item list-item--message">
                                    <span>No expenses</span>
                                </div>
                            ) : (
                                props.users.map((user) => {
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

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

export default connect(mapStateToProps)(UserList);
