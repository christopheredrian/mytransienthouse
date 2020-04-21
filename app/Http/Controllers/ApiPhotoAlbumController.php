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

        $albums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, null);

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

    public function updateFeatured($id) {

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

            $photoAlbum->is_featured = !$photoAlbum->is_featured;

            if (!$photoAlbum->save()) {
                throw new ErrorException("There was a problem while deleting the photo album");
            }

            return $this->all();

        } catch (Exception $exception) {
            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

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
