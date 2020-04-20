<?php

namespace App\Http\Controllers;

use App\PhotoAlbum;
use App\PhotoAlbumUtilities;
use Exception;
use ErrorException;
use App\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ApiPhotoAlbumController extends ApiAuthController
{
    public function all() {

        $albums = DB::table('photo_albums')
            ->select('photo_albums.id',
                'photo_albums.name',
                'photo_albums.description',
                'photos.url',
                'photos.updated_at')
            ->join('photo_album_photos', 'photo_albums.id', '=', 'photo_album_photos.photo_album_id')
            ->join('photos', 'photo_album_photos.photo_id', '=', 'photos.id')
            ->where('photo_albums.account_id', '=', $this->account->id)
            ->where('photo_album_photos.is_featured', '=', '1')
            ->where('photo_albums.deleted_at', '=', null)
            ->orderBy('photo_albums.created_at', 'desc')
            ->get();

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $albums);

    }

    public function allSelectedPhotos($albumId) {

        $unselectedPhotos = DB::select("
            SELECT
                p.id, p.url, pap.is_featured
            FROM
                photos p
            INNER JOIN photo_album_photos pap ON
                p.id = pap.photo_id
            WHERE
                pap.photo_album_id = ${albumId};
        ");

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $unselectedPhotos);
    }

    public function allUnselectedPhotos($albumId) {

        $unselectedPhotos = DB::select("
            SELECT
                *
            FROM
                photos p
            WHERE
                p.deleted_at IS NULL AND p.id NOT IN(
                SELECT
                    pap.photo_id
                FROM
                    photo_album_photos pap
                WHERE
                    pap.photo_album_id = ${albumId}
            )
        ");

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $unselectedPhotos);
    }

    public function upsert(Request $request) {

        try {
            $rules = [
                'name' => 'required',
                'description' => 'required',
                'selectedPhotos' => 'required'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                $errorBag = $validator->errors()->getMessageBag()->all();
                throw new InvalidArgumentException(implode(' ', $errorBag));
            }

            $photoAlbum = PhotoAlbumUtilities::preparePhotoAlbum($request);
            $photoAlbum->account_id = $this->account->id;
            $photoAlbum->user_id = $this->user->id;

            if (!$photoAlbum->save()) {
                throw new ErrorException(sprintf("An error occurred while saving photo album entry"));
            }

            PhotoAlbumUtilities::upsertPhotoAlbumPhotos($photoAlbum->id, $request->selectedPhotos);

            return $this->all();

        } catch(Exception $exception) {

            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }

    public function delete($id) {

        try {

            if (empty($id)) {
                throw new ErrorException("Id is required");
            }

            /** @var Photo $photo*/
            $photoAlbum = PhotoAlbum::find($id);

            if (!$photoAlbum) {
                throw new InvalidArgumentException("Photo Album not found");
            }

            if ($photoAlbum->account_id !== $this->account->id) {
                throw new InvalidArgumentException("Forbidden.");
            }

            if (!$photoAlbum->delete()) {
                throw new ErrorException("There was a problem while deleting the photo album");
            }

            return $this->all();

        } catch (Exception $exception) {
            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }
}
