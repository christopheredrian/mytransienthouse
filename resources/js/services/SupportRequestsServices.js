import Endpoints from "../config/Endpoints";
import {AppApiRequest} from "./index";

export const fetchAll = (onSuccess, onFailure, data = []) => {
    AppApiRequest('/api/support_requests/', 'GET', onSuccess, onFailure, data);
};

export const upsert = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PUBLIC_UPSERT_SUPPORT_REQUEST, 'POST', onSuccess, onFailure, data);
};
