<?php

namespace App\Utilities;

use App\PhotoAlbum;
use App\PhotoAlbumPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PhotoAlbumUtilities
{
    public static function getPhotoAlbumCollection($accountId)
    {

        $photoAlbumCollection = PhotoAlbum::select(
                'photo_albums.id',
                'photo_albums.name',
                'photo_albums.is_featured',
                'photo_albums.description',
                'photos.url',
                'photos.updated_at',
                DB::raw('(select count(id) from photo_album_photos where photo_album_id = photo_albums.id) as photosCount')
            )
            ->join('photo_album_photos', 'photo_albums.id', '=', 'photo_album_photos.photo_album_id')
            ->join('photos', 'photo_album_photos.photo_id', '=', 'photos.id')
            ->where('photo_albums.account_id', '=', $accountId)
            ->where('photo_albums.deleted_at', '=', null)
            ->where('photo_album_photos.is_featured', '=', '1')
            ->orderBy('photo_albums.is_featured', 'desc')
            ->orderBy('photo_albums.rank', 'asc')
            ->orderBy('photo_albums.created_at', 'desc');

        return $photoAlbumCollection;
    }

    public static function getPhotoAlbums($accountId, $featured = null, $extract = null)
    {

        $albums = self::getPhotoAlbumCollection($accountId);

        if ($featured) {
            $albums->where('photo_albums.is_featured', '=', $featured);
        }

        if($extract) {
            $albums->where('photo_albums.id', '!=', $extract);
        }

        return $albums->get();
    }

    public static function preparePhotoAlbum(Request $request)
    {

        if (!empty($request->id)) {
            // edit mode
            $photoAlbum = PhotoAlbum::findOrFail($request->id);
        } else {
            // create mode
            $photoAlbum = new PhotoAlbum();
        }

        $photoAlbum->name = $request->name;
        $photoAlbum->description = $request->description;
//        $photoAlbum->is_featured = null; // default value for now

        return $photoAlbum;
    }

    public static function upsertPhotoAlbumPhotos($albumId, $selectedPhotos)
    {

        // delete all before uploading new set of photos
        self::deletePhotoAlbumPhotos($albumId);

        foreach ($selectedPhotos as $selectedPhoto) {

            $photoAlbumPhoto = new PhotoAlbumPhoto();
            $photoAlbumPhoto->photo_id = $selectedPhoto['id'];
            $photoAlbumPhoto->is_featured = $selectedPhoto['is_featured'];
            $photoAlbumPhoto->photo_album_id = $albumId;

            $photoAlbumPhoto->save();
        }
    }

    public static function deletePhotoAlbumPhotos($albumId)
    {

        $deletedPhotoAlbumPhotos = DB::table('photo_album_photos')
            ->where('photo_album_id', "=", $albumId)
            ->delete();
    }
}
