const Endpoints = {
    LOGIN: '/api/login',
    TEST_DATA: '/api/test',
    INIT_USER: '/api/initialize_user',
    INIT_ACCOUNT: '/api/initialize_account',

    USERS_DATA: '/api/users',
    USER_DATA: '/api/users/',
    UPSERT_USER: '/api/users/upsert',

    PHOTOS_ALL: '/api/photos',
    UPLOAD_PHOTO: '/api/photos/upload_photo',
    DELETE_PHOTO: '/api/photos/delete_photo',

    PHOTO_ALBUMS_DATA: '/api/photo_albums',
    UPSERT_PHOTO_ALBUM: '/api/photo_albums/upsert',
    DELETE_PHOTO_ALBUM: '/api/photo_albums/delete',
    UPDATE_FEATURED_PHOTO_ALBUM: '/api/photo_albums/update_featured',
    PHOTO_ALBUM_SELECTED_PHOTOS: '/api/photo_albums/selected_photos',
    PHOTO_ALBUM_UNSELECTED_PHOTOS: '/api/photo_albums/unselected_photos',

    // FAQs
    FAQS_ALL: '/api/faqs/',

    // Public
    PUBLIC_FAQS_ALL: '/api/public/faqs',
    PUBLIC_PHOTOS_ALL: '/api/public/photos',
    PUBLIC_FEATURED_PHOTO_ALBUMS: '/api/public/featured_photo_albums',
    PUBLIC_PHOTO_ALBUM_PHOTOS: '/api/public/photo_album_photos',
};

export default Endpoints;
