<?php

namespace App\Http\Controllers;

use App\Account;
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

            if ($request->hasFile('photos') && strlen($request->userId) != 0) {

                $destinationPath =
                    S3Utilities::generateDestinationPath($request->userId, $this->account->subdomain);

                S3Utilities::uploadPhotos(
                    $destinationPath,
                    $request->file('photos'),
                    $this->account->id
                );
            }

            // DISCUSS w/ Chris.
            // Problematic since photos should be filtered by account_id
            // Getting of account is prohibited due to current setup of this controller
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

            $this->jsonApiResponse(self::STATUS_SUCCESS, 'Successfully deleted photo');

        } catch (Exception $exception) {
            $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }
}