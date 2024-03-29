import axios from 'axios';
import _ from 'lodash';

export const API_SUCCESS = 'success';
export const API_ERROR = 'error';

/**
 *  Generic App API Request compatible With ApiAuthController
 * @param {string} endpoint
 * @param {string } method
 * @param {function} onSuccess
 * @param {function} onError
 * @param {{}} data
 * @constructor
 */
export const AppApiRequest = (endpoint, method, onSuccess, onError, data = {}) => {


    if (method.toUpperCase() === 'GET' && !_.isEmpty(data)) {
        // Convert data to query params
        // { a: b, c: d}  -----> /endpoint?a=b&c=d

        const queryParams = _.map(data, (value, key) => {
            return `${key}=${value}`;
        });

        if (queryParams.length > 0) {
            const queryStr = queryParams.join('&');
            endpoint = `${endpoint}?${queryStr}`;
            data = {};
        }

    }

    axios({
        url: endpoint,
        method: method,
        data
    }).then(({
                 data: {
                     data = [],
                     message = 'Error in Fetching details',
                     status = API_ERROR,
                 } = {},
             }) => {

        if (status === API_SUCCESS) {

            if (_.isFunction(onSuccess)) {
                onSuccess(data);
            }
        } else {

            if (_.isFunction(onError)) {
                onError(message)
            }
        }


    }).catch((error) => {

        if (_.isFunction(onError)) {
            onError(error)
        }
    });
};
