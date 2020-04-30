import React from 'react';

import Home from './Home'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const PublicNavBar = () => {
    return (
        <nav className="navbar navbar-marketing navbar-expand-lg bg-white navbar-light bg-primary">
            <div className="container">
                {/*<a className="navbar-brand text-dark" href="/">{{$account->business_name ?? 'My Transient House' }}</a>*/}
                <a className="navbar-brand text-dark" href="/">MTH</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><i data-feather="menu" /></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-lg-5">
                        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/gallery">Gallery</a></li>
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
                                <a className="icon-list-social-link" href="javascript:void(0);"><i
                                    className="fab fa-instagram"></i></a><a
                                className="icon-list-social-link" href="javascript:void(0);"><i
                                className="fab fa-facebook"></i></a><a className="icon-list-social-link"
                                                                       href="javascript:void(0);"><i
                                className="fab fa-github"></i></a><a className="icon-list-social-link"
                                                                     href="javascript:void(0);"><i
                                className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-9 float-right">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 mb-5 mb-lg-0"></div>
                                <div className="col-lg-3 col-md-6 mb-5 mb-lg-0"></div>
                                <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                    <div className="text-uppercase-expanded text-xs mb-4">Products</div>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-2">
                                            <a target="_blank" href="https://researchbaguio.herokuapp.com/">Lengua</a>
                                        </li>
                                        <li className="mb-2">
                                            <a target="_blank" href="http://project-lengua.herokuapp.com/">Research
                                                Baguio
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
                            <a href="javascript:void(0);">Privacy Policy</a>
                            &middot;
                            <a href="javascript:void(0);">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
};

const PublicApp = () => {

    const [isUploading, setIsUploading] = useState(false);

    return (
        <Router>
            <div id="layoutDefault">
                <div id="layoutDefault_content">
                    <main className="bg-light">

                        <PublicNavBar/>

                        <Switch>
                            <Route path={'/'} exact={true}><Home/></Route>
                        </Switch>

                    </main>
                </div>

                <PublicFooter />
            </div>
        </Router>
    );

};

export default PublicApp;
