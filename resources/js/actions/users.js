import axios from 'axios';

// ADD_USER
export const addUser = (user) => ({
    type: 'ADD_USER',
    user
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            name = '',
            email = '',
            role = '',
            password = ''
        } = userData;

        const user = { name, email, role, password};

        return axios.post(`/api/addUser`, user)
            .then(({ data }) => {
                /**
                 * Success response
                 * set state data
                 */
                dispatch(addUser({
                    ...user
                }));
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    }
};


// SET_USERS
export const setUsers = (users) => ({
    type: 'SET_USERS',
    users
});

/**
 * Action Creator
 */
export const startSetUsers = () => {
        return (dispatch) => {

            return axios.get('/api/users')
                .then(({ data }) => {
                    /**
                     * Success response
                     * set state data
                     */
                    dispatch(setUsers(data));
                })
                .catch(error => {
                    console.error(error);
                    alert("There was an error while fetching requests");
                });
        }
};



