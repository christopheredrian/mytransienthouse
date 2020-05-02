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

export const publicFetchAll = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PUBLIC_FEATURED_PHOTO_ALBUMS, 'GET', onSuccess, onFailure);
};

export const publicFetchPhotoAlbumWithPhotos = (id, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.PUBLIC_PHOTO_ALBUM_PHOTOS}/${id}`, 'GET', onSuccess, onFailure);
};

export const fetchAllSelectedPhotos = (id, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.PHOTO_ALBUM_SELECTED_PHOTOS}/${id}`, 'GET', onSuccess, onFailure,);
};

export const fetchAllUnselectedPhotos = (id, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.PHOTO_ALBUM_UNSELECTED_PHOTOS}/${id}`, 'GET', onSuccess, onFailure,);
};

export const upsertPhotoAlbum = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.UPSERT_PHOTO_ALBUM, 'POST', onSuccess, onFailure, data);
};

export const updateFeaturedPhotoAlbum = (id, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.UPDATE_FEATURED_PHOTO_ALBUM}/${id}`, 'POST', onSuccess, onFailure);
};

export const deletePhotoAlbum = (id, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.DELETE_PHOTO_ALBUM}/${id}`, 'POST', onSuccess, onFailure);
};

