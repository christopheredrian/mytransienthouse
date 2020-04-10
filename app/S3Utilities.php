<?php

namespace App;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class S3Utilities
{
    const VALID_PHOTO_EXTENSIONS = array("jpeg", "jpg", "png");

    public static function generateHashToFileName(string $fileNameWithExtension)
    {

        $randomString = Hash::make(time());
        $randomHash   = substr($randomString, strlen($randomString) - 10, strlen($randomString));

        $extensionPos  = strrpos($fileNameWithExtension, '.');
        $fileName      = substr($fileNameWithExtension, 0, $extensionPos);
        $fileExtension = substr($fileNameWithExtension, $extensionPos);

        $fileNameWithHash = "{$fileName}_${randomHash}{$fileExtension}";

        return $fileNameWithHash;

    }

    public static function generateDestinationPath(string $userId, string $subdomain)
    {

        // Directory structures
        // Local:  local/photos/{id}_{subdomain}/business-owner
        // Prod:   prod/photos/{id}_{subdomain}/business-owner
        // Dev:    prod/photos/{id}_{subdomain}/business-owner

        $rootDirectory      = '';
        $userPhotoDirectory = "/photos/{$userId}_{$subdomain}/business-owner";

        if (!empty(env('LOCAL_DEV_USER'))) {
            $localDevUser = env('LOCAL_DEV_USER');

            $rootDirectory .= "local/dev/{$localDevUser}";
        } else {
            $rootDirectory .= env('APP_ENV') === 'local' ? 'local' : 'prod';
        }

        return ($rootDirectory . $userPhotoDirectory);

    }

    public static function uploadPhotos(string $destinationPath, array $uploadedPhotos, string $accountId)
    {

        foreach ($uploadedPhotos as $uploadedPhoto) {

            if (in_array(strtolower($uploadedPhoto->extension()), self::VALID_PHOTO_EXTENSIONS)) {

                $fileNameWithHashAndExtension = self::generateHashToFileName($uploadedPhoto->getClientOriginalName());

                $path = Storage::disk('s3')->putFileAs(
                    $destinationPath, $uploadedPhoto, $fileNameWithHashAndExtension, 'public'
                );

                // Store in photos table
                $newPhoto = new Photo;
                $newPhoto->owner_user_id = Auth::user()->id;
                $newPhoto->account_id = $accountId;
                $newPhoto->path = $path;
                $newPhoto->url = $newPhoto->getUrlAttribute();
                $newPhoto->is_active = true;

                $newPhoto->save();

            }
        }

    }
}