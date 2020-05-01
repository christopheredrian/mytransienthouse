import axios from "axios";
import Endpoints from "../config/Endpoints";

export const setAccount = accountData => {

    console.log("Action: INITIALIZE_ACCOUNT");
    console.log(accountData);

    return {
        type: 'INITIALIZE_ACCOUNT',
        ui: accountData['ui'],
        account: accountData['account'],
    }
};

/**
 * @returns {function(*): Promise<AxiosResponse<T>>}
 */
export const initializeAccount = () => {

    return (dispatch) => {

        return axios.get(`${Endpoints.INIT_ACCOUNT}`)
            .then(({data}) => {
                /**
                 * Success response
                 * set state data
                 */
                dispatch(setAccount(data.data));
            })
            .catch(error => {
                console.error(error);
                alert("There was an error while fetching requests");
            });
    }
};
