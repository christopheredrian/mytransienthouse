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

import UserList from './users/UserList'
import FetchDataExample from '../FetchDataExample';
import Login from "../Login";
import {logoutUser, setLoggedInUser} from "../../actions/auth";
import {connect} from "react-redux";

/**
 * todo:
 * Fetch current user
 */

// Sean: Edited for dev purposes. Para mabilis haha
const ADMIN_ROOT_PATH = '';

const AdminNavBar = () => {
    return (
        <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
            <a className="navbar-brand d-none d-sm-block" href="index.html">Admin</a>
            <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" id="sidebarToggle"
                    href="#">
                <i data-feather="menu"></i>
            </button>
            <form className="form-inline mr-auto d-none d-lg-block">
                <input className="form-control form-control-solid mr-sm-2" type="search" placeholder="Search"
                       aria-label="Search"/>
            </form>
            <ul className="navbar-nav align-items-center ml-auto">
                <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts"
                       href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false"><i data-feather="bell"/></a>
                    <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up"
                         aria-labelledby="navbarDropdownAlerts">
                        <h6 className="dropdown-header dropdown-notifications-header"><i className="mr-2"
                                                                                         data-feather="bell"/>Alerts
                            Center</h6>
                        <a className="dropdown-item dropdown-notifications-item" href="#!"
                        >
                            <div className="dropdown-notifications-item-icon bg-warning"><i data-feather="activity"></i>
                            </div>
                            <div className="dropdown-notifications-item-content">
                                <div className="dropdown-notifications-item-content-details">December 29, 2019</div>
                                <div className="dropdown-notifications-item-content-text">This is an alert message. It's
                                    nothing
                                    serious, but it requires your attention.
                                </div>
                            </div>
                        </a
                        ><a className="dropdown-item dropdown-notifications-item" href="#!"
                    >
                        <div className="dropdown-notifications-item-icon bg-info"><i data-feather="bar-chart"></i></div>
                        <div className="dropdown-notifications-item-content">
                            <div className="dropdown-notifications-item-content-details">December 22, 2019</div>
                            <div className="dropdown-notifications-item-content-text">A new monthly report is ready.
                                Click here
                                to view!
                            </div>
                        </div>
                    </a
                    ><a className="dropdown-item dropdown-notifications-item" href="#!"
                    >
                        <div className="dropdown-notifications-item-icon bg-danger"><i
                            className="fas fa-exclamation-triangle"/>
                        </div>
                        <div className="dropdown-notifications-item-content">
                            <div className="dropdown-notifications-item-content-details">December 8, 2019</div>
                            <div className="dropdown-notifications-item-content-text">Critical system failure, systems
                                shutting
                                down.
                            </div>
                        </div>
                    </a
                    ><a className="dropdown-item dropdown-notifications-item" href="#!"
                    >
                        <div className="dropdown-notifications-item-icon bg-success"><i data-feather="user-plus"></i>
                        </div>
                        <div className="dropdown-notifications-item-content">
                            <div className="dropdown-notifications-item-content-details">December 2, 2019</div>
                            <div className="dropdown-notifications-item-content-text">New user request. Woody has
                                requested
                                access to the organization.
                            </div>
                        </div>
                    </a
                    ><a className="dropdown-item dropdown-notifications-footer" href="#!">View All Alerts</a>
                    </div>
                </li>

                <li className="nav-item dropdown no-caret mr-3 dropdown-user">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage"
                       href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false"><img className="img-fluid" src="/img/user.png" alt={'user'}/></a>
                    <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up"
                         aria-labelledby="navbarDropdownUserImage">
                        <h6 className="dropdown-header d-flex align-items-center">
                            <img className="dropdown-user-img" src="/img/user.png"/>
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">John Doe</div>
                                <div className="dropdown-user-details-email">Email of john doe</div>
                            </div>
                        </h6>
                        <div className="dropdown-divider"/>
                        {/*<a className="dropdown-item" href="/logout">*/}
                        {/*    <div className="dropdown-item-icon"><i data-feather="log-out"/></div>*/}
                        {/*    Logout</a>*/}
                    </div>
                </li>
                <a className="dropdown-item" href="/logout">
                    <div className="dropdown-item-icon"><i data-feather="log-out"/>
                    </div>
                    Logout
                </a>
            </ul>
        </nav>

    );
};

const AdminSideBar = () => {
    return (

        <div id="layoutSidenav_nav">
            <nav className="sidenav shadow-right sidenav-light">
                <div className="sidenav-menu">
                    <div className="nav accordion" id="accordionSidenav">
                        <div className="sidenav-menu-heading">Management</div>

                        <Link to={`${ADMIN_ROOT_PATH}/fetch-sample`} className={'nav-link'}>
                            <div className="nav-link-icon"><i data-feather="activity"/></div>
                            Fetch Data Example
                        </Link>
                        <Link to={`${ADMIN_ROOT_PATH}/users`} className={'nav-link'}>
                            <div className="nav-link-icon"><i data-feather="activity"/></div>
                            Users
                        </Link>
                    </div>
                </div>
                <div className="sidenav-footer">
                    <div className="sidenav-footer-content">
                        <div className="sidenav-footer-subtitle">Logged in as:</div>
                        <div className="sidenav-footer-title"></div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

const AdminApp = ({logoutUser}) => {

    return (


        <Router>
            <div className={'nav-fixed'}>

                <AdminNavBar/>

                <div id="layoutSidenav">
                    <AdminSideBar/>

                    <div id="layoutSidenav_content">
                        <div className={'p-2 mt-4'}>

                            <Switch>
                                <Route path={`${ADMIN_ROOT_PATH}/fetch-sample`}><FetchDataExample/></Route>
                                <Route path={`${ADMIN_ROOT_PATH}/users`} exact={true}><UserList/></Route>
                                <Route path={`login`}><Login/></Route>
                            </Switch>

                        </div>

                        <footer className="footer mt-auto footer-light">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6 small">Copyright &copy; mytransienthouse 2019</div>
                                    <div className="col-md-6 text-md-right small">
                                        <a href="#!">Privacy Policy</a>
                                        &middot;
                                        <a href="#!">Terms &amp; Conditions</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>

            </div>
        </Router>
    );

};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    }
};
// export default connect(null, mapDispatchToProps)(AdminApp);
export default AdminApp;
