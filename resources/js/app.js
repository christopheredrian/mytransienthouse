/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import {initializeUser} from "./actions/auth";

require('./bootstrap');

axios.defaults.withCredentials = true;

import ReactDOM from "react-dom";
import React from "react";
import MainApp from "./components/MainApp";
import PublicApp from "./components/public/PublicApp";
import {Provider} from 'react-redux';
// import {startSetUsers} from './actions/users'
import configureStore from './store/configureStore';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// store.dispatch(startSetUsers()).then(() => {
// });

if (document.getElementById('admin-app')) {

    const store = configureStore();
    store.dispatch(initializeUser());

    const jsx = (
        <Provider store={store}>
            <MainApp/>
        </Provider>
    );

    ReactDOM.render(jsx, document.getElementById('admin-app'));
} else {
    const store = configureStore();
    store.dispatch(initializeUser());

    ReactDOM.render(<PublicApp />, document.getElementById('public-app'));
}
