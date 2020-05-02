import React from 'react';
import {connect} from 'react-redux';

import Home from './public/Home'
import Gallery from './public/Gallery'

import {Menu} from "react-feather";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const PublicApp = ({account = null}) => {
    return (
        <Router>
            <div id="layoutDefault">
                <div id="layoutDefault_content">
                    <main className="bg-light">

                        <PublicNavBar businessName={account.business_name}/>

                        <Switch>
                            <Route path={'/'} exact={true}><Home/></Route>
                            <Route path={`/gallery`} exact={true}><Gallery/></Route>
                            <Route path={`/gallery/:id`}><Gallery/></Route>
                        </Switch>

                    </main>
                </div>

                <PublicFooter />
            </div>
        </Router>
    );
};

const PublicNavBar = ({businessName = 'MTH'}) => {
    return (
        <nav className="navbar navbar-marketing navbar-expand-lg bg-white navbar-light bg-primary">
            <div className="container">
                <a className="navbar-brand text-dark" href="/">{ businessName }</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><Menu /></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-lg-5">
                        <li className="nav-item">
                            <Link to={"/"} className={'nav-link'}>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/gallery"} className={'nav-link'}>
                                Gallery
                            </Link>
                        </li>

                        {/*<li className="nav-item"><a className="nav-link" href="/gallery">Gallery</a></li>*/}
                    </ul>
                    <a className="btn-primary btn rounded-pill px-4 ml-lg-4" href="/contact">
                        Book Now
                        <i className="fas fa-arrow-right ml-1"/>
                    </a>
                </div>
            </div>
        </nav>

    );
};

const PublicFooter = () => {
    return (
        <div id="layoutDefault_footer">
            <footer className="footer pt-10 pb-5 mt-auto bg-light footer-white bg-light footer-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="footer-brand">TrenchDev</div>
                            <div className="mb-3">Build better websites</div>
                            <div className="icon-list-social mb-5">
                                <a className="icon-list-social-link" href="#">
                                    <i className="fab fa-instagram"/>
                                </a>
                                <a className="icon-list-social-link" href="#">
                                    <i className="fab fa-facebook"/>
                                </a>
                                <a className="icon-list-social-link" href="#">
                                    <i className="fab fa-github"/>
                                </a>
                                <a className="icon-list-social-link" href="#">
                                    <i className="fab fa-twitter"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-9 float-right">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 mb-5 mb-lg-0"/>
                                <div className="col-lg-3 col-md-6 mb-5 mb-lg-0"/>
                                <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                    <div className="text-uppercase-expanded text-xs mb-4">Products</div>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <a target="_blank" href="https://researchbaguio.herokuapp.com/">Lengua</a>
                                        </li>
                                        <li className="mb-2">
                                            <a target="_blank" href="http://project-lengua.herokuapp.com/">
                                                Research Baguio
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                    <div className="text-uppercase-expanded text-xs mb-4">Utilities</div>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <a target="_blank" href="https://rjs-expensify-app.herokuapp.com/">
                                                Expense Tracker
                                            </a>
                                        </li>
                                        <li className="mb-2">
                                            <a target="_blank" href="https://rjs-indecision-app.herokuapp.com/">
                                                Decision Randomizer
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-5"/>
                    <div className="row align-items-center">
                        <div className="col-md-6 small">Copyright &copy; My Transient House 2020</div>
                        <div className="col-md-6 text-md-right small">
                            <a href="#">Privacy Policy </a>
                            &middot;
                            <a href="#"> Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        account: state.account ? state.account : null,
    }
};

export default connect(mapStateToProps)(PublicApp);
