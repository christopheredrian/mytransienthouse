<?php

namespace App\Http\Controllers;


use App\PhotoAlbum;

use App\PhotoAlbumPhoto;
use Exception;
use ErrorException;
use App\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ApiPhotoAlbumController extends ApiAuthController
{
    public function all() {

        $albums = PhotoAlbum::where('account_id', $this->account->id)
            ->get();

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $albums);

    }

    public function upload(Request $request) {

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
            } else {

                $photoAlbum = new PhotoAlbum();
                $photoAlbum->name = $request->name;
                $photoAlbum->description = $request->description;
                $photoAlbum->is_featured = true;

                $photoAlbum->account_id = $this->account->id;
                $photoAlbum->user_id = Auth::user()->id;

                if (!$photoAlbum->save()) {
                    throw new ErrorException(sprintf("An error occurred while saving entry"));
                } else {

                    foreach ($request->selectedPhotos as $selectedPhoto) {

                        $photoAlbumPhoto = new PhotoAlbumPhoto();
                        $photoAlbumPhoto->photo_id = $selectedPhoto['id'];
                        $photoAlbumPhoto->photo_album_id = $photoAlbum->id;

                        $photoAlbumPhoto->save();
                    }

                    $photoAlbums = PhotoAlbum::where('account_id', $this->account->id)
                        ->get();

                    return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $photoAlbums);

                }
            }

        } catch(Exception $exception) {

            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }
    }

    public function delete(Request $request) {

        try {

            if (empty($request->id)) {
                throw new ErrorException("Id is required");
            }

            /** @var Photo $photo*/
            $photo = Photo::find($request->id);

            if (!$photo) {
                throw new InvalidArgumentException("Photo not found");
            }

            if ($photo->account_id !== $this->account->id) {
                throw new InvalidArgumentException("Forbidden.");
            }

            if (!$photo->delete()) {
                throw new ErrorException("There was a problem while deleting the photo");
            }

            $photos = Photo::where('account_id', $this->account->id)
                ->get();

            return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Successfully deleted photo', $photos);

        } catch (Exception $exception) {
            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }
}