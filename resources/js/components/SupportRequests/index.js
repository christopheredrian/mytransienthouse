import React, {useEffect, useState} from 'react';
import _ from 'lodash';

import {fetchAll} from "../../services/SupportRequestsServices";
import Ingredients from '../ingredients';

const SupportRequests = () => {

    const [supportRequests, setSupportRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [filters, setFilters] = useState({
        status: 'pending',
    });

    useEffect(() => {
        fetchAll(
            data => setSupportRequests(data),
            error => setErrorMessage(error),
            filters
        );
    }, [filters]);

    const onFilterClicked = status => setFilters({status});

    return (
        <div className={'container mt-5'}>

            <div className={'row'}>
                {
                    errorMessage &&
                    <div className="col">
                        <Ingredients.Info infoClass={'danger'}>
                            {errorMessage}
                        </Ingredients.Info>
                    </div>
                }

                <div className="col-lg-4 col-xl-3 mb-5">
                    <div className="card">
                        <div className="list-group list-group-flush small">
                            <button
                                className="list-group-item list-group-item-action"
                                onClick={() => onFilterClicked('pending')}
                            >
                                <i className="fas fa-envelope fa-fw mr-2 text-gray-400"/>
                                Pending
                            </button>
                            <button
                                className="list-group-item list-group-item-action"
                                onClick={() => onFilterClicked('marked_as_read')}
                            >
                                <i className="fas fa-envelope-open fa-fw mr-2 text-gray-400"/>
                                Marked as Read
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xl-9">
                    {
                        (
                            supportRequests &&
                            !_.isEmpty(supportRequests)
                        )
                            ?
                            supportRequests.map((data, index) => {
                                return (
                                    <SupportRequestCard
                                        key={data.id || index}
                                        supportRequest={data}
                                    />
                                );
                            })

                            :

                            <div className="col">
                                <Ingredients.Info infoClass={'info'}>
                                    There are no entries found
                                </Ingredients.Info>
                            </div>

                    }
                </div>


            </div>
        </div>
    );
};

const SupportRequestCard = ({supportRequest}) => {

    const {
        id,
        email,
        status,
        full_name,
        phone,
        subject,
        body,
        reference_number,
        created_at
    } = supportRequest;

    return (
        <div>
            <div
                className="d-flex align-items-center justify-content-between flex-column flex-md-row">
                <h2 className="mb-0">Reference Number {reference_number}</h2>
                <div className="h5">
                    <span
                        className="badge badge-warning-soft text-warning font-weight-normal">
                        {status}
                    </span>
                </div>
            </div>
            <hr className="mb-4"/>
            <div className="card mb-5">
                <div className="card-header d-flex justify-content-between">
                    <div className="mr-2 text-dark">
                        {subject}
                        <div className="text-xs text-muted">{created_at}</div>
                    </div>
                    {/*<a href="#!">#290225</a>*/}
                </div>
                <div className="card-body">


                    <p className="mb-0">
                        {body}
                    </p>
                    <hr/>

                    <p className="mb-0 small">{full_name}<br/>
                        {email}<br/>
                        {phone}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default SupportRequests;
