import axios from "axios";
import Endpoints from "../config/Endpoints";

export const setLoggedInUser = user => {

    console.log("Action: INITIALIZE_USER");
    console.log(user);
    return {
        type: 'INITIALIZE_USER',
        user,
    }
};

/**
 * @returns {function(*): Promise<AxiosResponse<T>>}
 */
export const initializeUser = () => {
    return (dispatch) => {

        return axios.get(Endpoints.INIT_USER)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                dispatch(setLoggedInUser(data));
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    }
};
