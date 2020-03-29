import React from "react";
import {
    BrowserRouter as Router, Link, Route, Switch
} from "react-router-dom";
import UserList from '../admin/UserList';

const ADMIN_ROOT_PATH = '/admin';

const SideBar = () => {
    return (
        <div className={'pt-5'}>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to={`${ADMIN_ROOT_PATH}/fetch-sample`}>
                                    Fetch Data Example
                                </Link>
                            </li>
                            <li>
                                <Link to={`${ADMIN_ROOT_PATH}/users`}>
                                    Users
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Switch>
                    <Route path={`${ADMIN_ROOT_PATH}/fetch-sample`}>
                        <FetchDataExample />
                    </Route>
                    <Route path={`${ADMIN_ROOT_PATH}/users`}>
                        <UserList />
                    </Route>
                </Switch>
            </Router>

        </div>

    );
};
