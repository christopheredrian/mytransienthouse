import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Login from "./Login";
import AdminApp from "./admin/AdminApp";
import BusinessOwnerApp from './business-owner/BusinessOwnerApp';
import {logoutUser} from "../actions/auth";

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
};

const MainApp = ({ loggedInUser = null, setLoggedInUser = null}) => {

    // const isLoggedIn = !!(loggedInUser && loggedInUser.id && loggedInUser.api_token);
    //
    // if (!isLoggedIn) {
    //     window.location = "/login";
    // }
    //
    // if (isLoggedIn) {
    /**
     * User is logged in.
     * Rak na!
     */
    // setApiTokenToAxiosDefaults(loggedInUser.api_token || null);
    /**
     * todo: future - return appropriate component here for other roles
     */


    // console.log(location.pathname);

    if (loggedInUser === null) {

        /**
         * Loading page
         */
        return (<p>Loading...</p>)

    } else {

        // Temporary. Adjusted so that admin can also access /bo
        if (location.pathname.includes('/bo') && (loggedInUser.role === 'admin' || loggedInUser.role === 'business_owner')) {

            return <BusinessOwnerApp/>;

        } else if (loggedInUser.role === 'admin') {

            return <AdminApp/>;

        } else {

            return (<p>Unauthorized</p>)

        }

    }

    // } else {
    //     /**
    //      * Unauthenticated
    //      */
    //     // logoutUser();
    //     // return <Login/>
    //
    // }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUser ? state.loggedInUser : null,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
// export default MainApp;
