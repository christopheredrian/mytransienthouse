import React from 'react';

const Info = (props) => {

    const infoClass = props.infoClass || 'info';

    return (
        <div className={`alert alert-${infoClass}`}>
            {props.children}
        </div>
    );
};

export default Info;
