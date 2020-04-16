import {AppApiRequest} from "./index";

export const fetchAll = (onSuccess, onFailure, data = []) => {
    AppApiRequest('/api/support_requests/', 'GET', onSuccess, onFailure, data);
};
