import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Row, Col, Navbar, Nav
} from 'react-bootstrap';

import UserList from './UserList'
import FetchDataExample from '../FetchDataExample';
import Login from "../Login";
import {logoutUser, setLoggedInUser} from "../../actions/auth";
import {connect} from "react-redux";

/**
 * todo:
 * Fetch current user
 */

const ADMIN_ROOT_PATH = '/admin';


const AdminApp = ({logoutUser}) => {

    return (
        <div>
            <Router>
                <Row>
                    <Col className={'no-gutters'}>
                        <Navbar bg="primary" variant={'dark'} expand="lg" className={'px-5'}>
                            {/* Left */}
                            <Navbar.Collapse className={'order-0 w-100'}>
                                <Nav>
                                    <Navbar.Brand href="#home">MTH Admin</Navbar.Brand>
                                    <Link to={`${ADMIN_ROOT_PATH}/fetch-sample`} className={'nav-link'}>Fetch Data
                                        Example</Link>
                                    <Link to={`${ADMIN_ROOT_PATH}/users`} className={'nav-link'}>Users</Link>
                                </Nav>
                            </Navbar.Collapse>

                            {/* Right */}
                            <Navbar.Collapse className={'order-1 w-100'}>
                                <Nav className={'ml-auto'}>
                                    <a to={`login`} className={'nav-link text-right'} onClick={() => {
                                        logoutUser();
                                    }}>
                                        Logout
                                    </a>
                                </Nav>
                            </Navbar.Collapse>

                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={'mt-5'}>
                            <Switch>
                                <Route path={`${ADMIN_ROOT_PATH}/fetch-sample`}><FetchDataExample/></Route>
                                <Route path={`${ADMIN_ROOT_PATH}/users`}><UserList/></Route>
                                <Route path={`login`}><Login/></Route>
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </Router>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    }
};
export default connect(null, mapDispatchToProps)(AdminApp);
