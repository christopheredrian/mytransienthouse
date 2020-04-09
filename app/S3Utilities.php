<?php
/**
 * Created by PhpStorm.
 * User: seand
 * Date: 4/9/20
 * Time: 6:55 PM
 */

namespace App;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class S3Utilities
{
    const VALID_PHOTO_EXTENSIONS = array("jpeg", "jpg", "png");

    public static function generateDestinationPath(string $userId, string $subdomain) {

        // Directory structures
        // Local:  local/photos/{id}_{subdomain}/business-owner
        // Prod:   prod/photos/{id}_{subdomain}/business-owner
        // Dev:    prod/photos/{id}_{subdomain}/business-owner

        $rootDirectory = '';
        $userPhotoDirectory = '/photos/'. $userId . '_' .$subdomain .'/business-owner';

        if (env('LOCAL_DEV_USER') !== true) {
            $rootDirectory .= 'local/dev/' . env('LOCAL_DEV_USER');
        } else {
            $rootDirectory .= env('APP_ENV') === 'local' ? 'local' : 'prod';
        }

        return ($rootDirectory . $userPhotoDirectory);
    }

    public static function uploadPhotos(string $destinationPath, array $uploadedPhotos, string $accountId) {

        foreach ($uploadedPhotos as $uploadedPhoto) {

            $fileExtension = $uploadedPhoto->extension();
            $fileNameWithExtension = $uploadedPhoto->getClientOriginalName();

            if (in_array(strtolower($fileExtension), self::VALID_PHOTO_EXTENSIONS)) {

                $path = Storage::disk('s3')->putFileAs(
                    $destinationPath, $uploadedPhoto, $fileNameWithExtension,'public'
                );

                // Store in photos table
                $newPhoto                = new Photo;
                $newPhoto->owner_user_id = Auth::user()->id;
                $newPhoto->account_id    = $accountId;
                $newPhoto->path          = $path;
                $newPhoto->is_active     = true;

                $newPhoto->save();

            }
        }
    }
}