<?php

namespace App\Http\Controllers;

use Exception;
use ErrorException;
use App\Photo;
use App\S3Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class ApiPhotoController extends ApiAuthController
{
    public function all() {

        $photos = Photo::where('account_id', $this->account->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $photos);

    }

    public function upload(Request $request) {

        try {
            $rules = [
                'photos.*' => 'required|image|mimes:jpg,jpeg,png'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                $errorBag = $validator->errors()->getMessageBag()->all();
                throw new InvalidArgumentException(implode(' ', $errorBag));
            }

            if (!$request->hasFile('photos')) {
                throw new InvalidArgumentException("Photo is required");
            }

            $destinationPath = S3Utilities::generateDestinationPath($this->account, 'photos');

            S3Utilities::savePhotosOrFail(
                $this->account,
                $this->user,
                $destinationPath,
                $request->file('photos')
            );

            $photos = Photo::where('account_id', $this->account->id)
                ->get();

            return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $photos);

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
