import Endpoints from "../config/Endpoints";
import {AppApiRequest} from "./index";

/**
 * Fetch All Faqs for account
 * @param onSuccess
 * @param onFailure
 */
export const fetchAll = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PHOTO_ALBUMS_DATA, 'GET', onSuccess, onFailure);
};

export const uploadPhotoAlbum = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.UPLOAD_PHOTO_ALBUM, 'POST', onSuccess, onFailure, data);
};

export const deletePhotoAlbum = (id, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.DELETE_PHOTO_ALBUM, 'POST', onSuccess, onFailure, { id });
};
