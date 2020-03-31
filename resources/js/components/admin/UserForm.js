import React, { useEffect, useState } from 'react';

const UserForm = (props) => {

    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!userName || !userRole || !userEmail) {
            setError('Please provide user name, role and email');
        } else {
            const userData = {
                name: userName,
                role: userRole,
                email: userEmail,
            }

            props.onSubmit(userData);
        }
    }

    useEffect(() => {
        if(props.userData) {
            setUserName(props.userData.name);
            setUserRole(props.userData.role);
            setUserEmail(props.userData.email);
        }
    }, [props.userData])

    return (
        <div>
            <form onSubmit={onSubmit}>
                {error && <p className="form__error">{error}</p>}
                <input
                    className="text-input"
                    type="text"
                    placeholder="Name"
                    value={userName || ''}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    className="text-input"
                    type="text"
                    placeholder="Role"
                    value={userRole || ''}
                    onChange={(e) => setUserRole(e.target.value)}
                />
                <input
                    className="text-input"
                    type="email"
                    placeholder="Email"
                    value={userEmail || ''}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button className="button">Save user</button>
            </form>
        </div>
    )
}

export { UserForm as default }
