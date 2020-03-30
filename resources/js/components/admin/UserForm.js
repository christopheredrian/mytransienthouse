import React, { useState } from 'react';

const UserForm = (props) => {
    const [userName, setUserName] = useState(props.userData ? props.userData.name : '');
    const [userRole, setUserRole] = useState(props.userData ? props.userData.role : '');
    const [userEmail, setUserEmail] = useState(props.userData ? props.userData.email : '');
    const [error, setError] = useState({ error: '' });

    const onSubmit = (e) => {
        e.preventDefault();

        let error = '';

        if (!userName || !userRole || !userEmail) {
            error = 'Please provide all inputs';

            setError({ error });
        } else {
            console.log('pasok dito');

            const userData = {
                name: userName,
                role: userRole,
                email: userEmail,
            }

            props.addUser(userData);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    className="text-input"
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    className="text-input"
                    type="text"
                    placeholder="Role"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                />
                <input
                    className="text-input"
                    type="email"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button className="button">Save user</button>
            </form>
        </div>
    )
}

export { UserForm as default }
