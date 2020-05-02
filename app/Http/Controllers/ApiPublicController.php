<?php

namespace App\Http\Controllers;

use App\Faq;
use App\Photo;
use App\PhotoAlbum;
use App\Utilities\PhotoAlbumUtilities;
use App\Utilities\UiUtilities;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class ApiPublicController extends ApiController
{
    public function account()
    {

        $ui = UiUtilities::getForAccount($this->account);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
            "ui" => $ui,
            "account" => $this->account
        ]);

    }

    public function faqs()
    {

        $faqs = Faq::where('account_id', $this->account->id)
            ->get();

        if (!$faqs) {
            throw new InvalidArgumentException("Faq not found");
        }

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $faqs);

    }

    public function featuredPhotoAlbums()
    {

        $photoAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        if (!$photoAlbums) {
            throw new InvalidArgumentException("Photo albums not found");
        }

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $photoAlbums);

    }

    public function allPhotos()
    {
        $photos = DB::table('photos')
            ->where('account_id', '=', $this->account->id)
            ->whereNull('deleted_at')
            ->select('photos.*')
            ->get();

        $otherAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
            'photos' => $photos,
            'otherAlbums' => $otherAlbums
        ]);
    }

    public function photoAlbumPhotos($photoAlbumId)
    {

        $photoAlbum = PhotoAlbum::findOrFail($photoAlbumId);

        if ($photoAlbum->is_featured === null || $photoAlbum->is_featured === 0) {
            throw new InvalidArgumentException("Forbidden.");
        }

        $allPhotosCount = Photo::where('account_id', $this->account->id)->count();
        $otherAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        $photos = DB::table('photos')
            ->join('photo_album_photos', 'photos.id', '=', 'photo_album_photos.photo_id')
            ->where('photo_album_photos.photo_album_id', '=', $albumId)
            ->select('photos.*')
            ->get();

        return view('public.photo-album', [
            'photos' => $photos,
            'photoAlbum' => $photoAlbum,
            'otherAlbums' => $otherAlbums,
            'allPhotosCount' => $allPhotosCount
        ]);
    }

}