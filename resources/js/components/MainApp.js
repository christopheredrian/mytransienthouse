import React from 'react';
import {connect} from 'react-redux';

import Login from "./Login";
import AdminApp from "./admin/AdminApp";

/**
 * @param user
 * @param loggedInUser
 * @returns {*}
 * @constructor
 */
const MainApp = ({loggedInUser = null}) => {

    const isLoggedIn = !!(loggedInUser && loggedInUser.id && loggedInUser.api_token);

    if (isLoggedIn) {
        return <AdminApp/>;
    } else {
        /**
         * Unauthenticated
         */
        return <Login/>

    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser ? state.loggedInUser : null,
    }
};

export default connect(mapStateToProps, null)(MainApp);
