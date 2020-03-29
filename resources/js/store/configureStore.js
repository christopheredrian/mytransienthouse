import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import usersReducer from '../reducers/users';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    console.log("Configuring Store");
    return createStore(
        combineReducers({
            users: usersReducer,
            loggedInUser: authReducer,
        }),
        composeEnhancers(applyMiddleware(thunkMiddleware))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
