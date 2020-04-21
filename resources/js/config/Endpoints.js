const Endpoints = {
    LOGIN: '/api/login',
    TEST_DATA: '/api/test',
    INIT_USER: '/api/initialize_user',

    USERS_DATA: '/api/users',
    USER_DATA: '/api/users/',
    UPSERT_USER: '/api/users/upsert',

    PHOTOS_DATA: '/api/photos',
    UPLOAD_PHOTO: '/api/photos/upload_photo',
    DELETE_PHOTO: '/api/photos/delete_photo',

    PHOTO_ALBUMS_DATA: '/api/photo_albums',
    UPSERT_PHOTO_ALBUM: '/api/photo_albums/upsert',
    UPDATE_FEATURED_PHOTO_ALBUM: '/api/photo_albums/update_featured',
    PHOTO_ALBUM_SELECTED_PHOTOS: '/api/photo_albums/selected_photos',
    PHOTO_ALBUM_UNSELECTED_PHOTOS: '/api/photo_albums/unselected_photos',

    // FAQs
    FAQS_ALL: '/api/faqs/',
};

export default Endpoints;
