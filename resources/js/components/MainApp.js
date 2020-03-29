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

/**
 * If set, inject api token to all axios requests
 * @param apiToken
 */
const setApiTokenToAxiosDefaults = (apiToken) => {

    if (apiToken) {
        axios.interceptors.request.use(function (config) {

            if (!config.data) {
                config.data = {}
            }

            // assign your variables here
            config.data.api_token = apiToken;

            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }
};

const MainApp = ({loggedInUser = null}) => {
    
    const isLoggedIn = !!(loggedInUser && loggedInUser.id && loggedInUser.api_token);

    if (isLoggedIn) {
        /**
         * User is logged in.
         * Rak na!
         */
        setApiTokenToAxiosDefaults(loggedInUser.api_token || null);
        /**
         * todo: future - return appropriate component here for other roles
         */
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
