import React from 'react';
import {Button, Row, Col, Form, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap';

const TableToolBar = ({usersPerPage, changeUsersPerPage, setShowUserForm, searchFilter, onSearchChange}) => {
    return (
        <Row>
            <Col className="float-left">
                <Button
                    variant="primary"
                    onClick={() => setShowUserForm(true)}
                >
                    Add User
                </Button>
            </Col>

            <Col className="float-right">
                <Row>
                    <Col>
                        <div className="float-right">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Show </InputGroup.Text>
                                </InputGroup.Prepend>
                                <DropdownButton
                                    as={InputGroup.Prepend}

                                    variant="info"
                                    id="users-per-page-dropdown"
                                    title={usersPerPage}
                                    onSelect={(eKey, e) => changeUsersPerPage(eKey)}
                                >
                                    <Dropdown.Item href="#" eventKey={5}>5</Dropdown.Item>
                                    <Dropdown.Item href="#" eventKey={10}>10</Dropdown.Item>
                                    <Dropdown.Item href="#" eventKey={15}>15</Dropdown.Item>
                                </DropdownButton>
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon1"> users</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col>
                        <div className="float-right">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="search-filter"
                                    value={searchFilter || ''}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Search </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export {TableToolBar as default}
