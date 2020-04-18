<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PhotoAlbumUtilities
{
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
        $photoAlbum->is_featured = null; // default value for now

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
            ->where('photo_album_id', "=",$albumId)
            ->delete();

//        dd($deletedPhotoAlbumPhotos);

    }


}
