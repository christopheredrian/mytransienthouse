import React from 'react';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Loading = () => {
    return (
        <div className="container bg-light">
            <div className="row py-10 mt-10">
                <div className="col text-center">
                    <Loader
                        type="Bars"
                        color="grey"
                        height={100}
                        width={100}
                    />
                </div>
            </div>
        </div>
    )
};

export default Loading;