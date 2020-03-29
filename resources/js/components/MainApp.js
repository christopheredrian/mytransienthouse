import React from 'react';


import {
    Row, Col, Navbar, Nav
} from 'react-bootstrap';

import Login from "./Login";
import AdminApp from "./admin/AdminApp";

/**
 * todo:
 * Fetch current user
 */

const MainApp = () => {

    // const isLoggedIn = false;
    const isLoggedIn = true;

    if (isLoggedIn) {
        return <AdminApp/>;
    } else {
        /**
         * Unauthenticated
         */
        return <Login/>

    }
};

export default MainApp;
