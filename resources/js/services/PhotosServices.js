import Endpoints from "../config/Endpoints";
import {AppApiRequest} from "./index";

/**
 * Fetch All Faqs for account
 * @param onSuccess
 * @param onFailure
 */
export const fetchAll = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PHOTOS_ALL, 'GET', onSuccess, onFailure);
};

export const publicFetchAll = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PUBLIC_PHOTOS_ALL, 'GET', onSuccess, onFailure);
};

export const uploadPhoto = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.UPLOAD_PHOTO, 'POST', onSuccess, onFailure, data);
};

export const deletePhoto = (id, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.DELETE_PHOTO, 'POST', onSuccess, onFailure, { id });
};
