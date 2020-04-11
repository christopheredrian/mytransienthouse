import React from 'react';

const Dashboard = () => {
    return(
        <main>
            <div className="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
                <div className="container-fluid">
                    <div className="page-header-content">
                        <h1 className="page-header-title">
                            <div className="page-header-icon"><i data-feather="activity"></i></div>
                            <span>Dashboard</span>
                        </h1>
                        <div className="page-header-subtitle">Overview and content summary for your transient house</div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-n10">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-header">Monthly Earnings</div>
                            <div className="card-body">
                                <div className="chart-area">
                                    <canvas id="myAreaChart" width="100%" height="30"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-header">Monthly Revenue</div>
                            <div className="card-body">
                                <div className="chart-bar">
                                    <canvas id="myBarChart" width="100%" height="30"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-primary text-white mb-4">
                            <div className="card-body">Website Photos</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">Manage photos</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-warning text-white mb-4">
                            <div className="card-body">Pending Reservations</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">View reservations</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-success text-white mb-4">
                            <div className="card-body">Revenue Summary</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">View reports</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-cyan text-white mb-4">
                            <div className="card-body">Promos</div>
                            <div className="card-footer d-flex align-items-center justify-content-between">
                                <a className="small text-white stretched-link" href="#">Manage promos</a>
                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">Customers</div>
                    <div className="card-body">
                        <div className="datatable table-responsive">
                            <table className="table table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                <tr>
                                    <td>Tiger Nixon</td>
                                    <td>System Architect</td>
                                    <td>Edinburgh</td>
                                    <td>61</td>
                                    <td>2011/04/25</td>
                                    <td>$320,800</td>
                                    <td>
                                        <div className="badge badge-primary badge-pill">Full-time</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Garrett Winters</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>63</td>
                                    <td>2011/07/25</td>
                                    <td>$170,750</td>
                                    <td>
                                        <div className="badge badge-warning badge-pill">Pending</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ashton Cox</td>
                                    <td>Junior Technical Author</td>
                                    <td>San Francisco</td>
                                    <td>66</td>
                                    <td>2009/01/12</td>
                                    <td>$86,000</td>
                                    <td>
                                        <div className="badge badge-secondary badge-pill">Part-time</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Cedric Kelly</td>
                                    <td>Senior Javascript Developer</td>
                                    <td>Edinburgh</td>
                                    <td>22</td>
                                    <td>2012/03/29</td>
                                    <td>$433,060</td>
                                    <td>
                                        <div className="badge badge-info badge-pill">Contract</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Airi Satou</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>33</td>
                                    <td>2008/11/28</td>
                                    <td>$162,700</td>
                                    <td>
                                        <div className="badge badge-primary badge-pill">Full-time</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Brielle Williamson</td>
                                    <td>Integration Specialist</td>
                                    <td>New York</td>
                                    <td>61</td>
                                    <td>2012/12/02</td>
                                    <td>$372,000</td>
                                    <td>
                                        <div className="badge badge-primary badge-pill">Full-time</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Herrod Chandler</td>
                                    <td>Sales Assistant</td>
                                    <td>San Francisco</td>
                                    <td>59</td>
                                    <td>2012/08/06</td>
                                    <td>$137,500</td>
                                    <td>
                                        <div className="badge badge-primary badge-pill">Full-time</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Rhona Davidson</td>
                                    <td>Integration Specialist</td>
                                    <td>Tokyo</td>
                                    <td>55</td>
                                    <td>2010/10/14</td>
                                    <td>$327,900</td>
                                    <td>
                                        <div className="badge badge-primary badge-pill">Full-time</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Colleen Hurst</td>
                                    <td>Javascript Developer</td>
                                    <td>San Francisco</td>
                                    <td>39</td>
                                    <td>2009/09/15</td>
                                    <td>$205,500</td>
                                    <td>
                                        <div className="badge badge-info badge-pill">Contract</div>
                                    </td>
                                    <td>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                            data-feather="more-vertical"></i></button>
                                        <button className="btn btn-datatable btn-icon btn-transparent-dark"><i
                                            data-feather="trash-2"></i></button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
