import Endpoints from "../config/Endpoints";
import {AppApiRequest} from "./index";

/**
 * Fetch All Faqs for account
 * @param onSuccess
 * @param onFailure
 */
export const fetchAll = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.FAQS_ALL, 'GET', onSuccess, onFailure);
};

export const publicFetchAll = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PUBLIC_FAQS_ALL, 'GET', onSuccess, onFailure);
};

export const fetchOne = (id, onSuccess, onFailure) => {
    AppApiRequest(`/api/faqs/${id}`, 'GET', onSuccess, onFailure);
};

export const upsert = (data, onSuccess, onFailure) => {
    AppApiRequest(`/api/faqs/upsert`, 'POST', onSuccess, onFailure, data);
};

export const deleteFaq = (id, onSuccess, onFailure) => {
    AppApiRequest(`/api/faqs/delete/${id}`, 'POST', onSuccess, onFailure);
};
