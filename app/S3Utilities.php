<?php

namespace App;

use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;

class S3Utilities
{
    const VALID_PHOTO_EXTENSIONS = array("jpeg", "jpg", "png");

    /**
     * @param string $fileNameWithExtension
     * @return string
     */
    public static function generateHashToFileName(string $fileNameWithExtension)
    {

        $randomString = md5(time() . rand(0, 100));
        $randomHash = substr($randomString, 0, 10);

        $parts = pathinfo($fileNameWithExtension);
        $fileName = $parts['filename'] ?? '';
        $extension = $parts['extension'] ?? '';

        return "{$fileName}_${randomHash}.{$extension}";
    }

    /**
     * @param Account $account
     * @param string $moduleName
     * @return string
     */
    public static function generateDestinationPath(Account $account, string $moduleName): string
    {

        $accountId = $account->id ?? null;
        $subdomain = $account->subdomain ?? null;

        if (empty($accountId) || empty($subdomain)) {
            throw new InvalidArgumentException("Invalid Account.");
        }

        $localDevUser = env('LOCAL_DEV_USER') ?: 'mytransienthouse';
        $environment = env('APP_ENV') ?: 'local';

        /**
         * Reference:
         * Local:  local/sean/photos/1_genove/
         * Prod:   production/mytransienthouse/photos/1_genove
         */
        return "{$environment}/{$localDevUser}/{$moduleName}/{$accountId}_{$subdomain}";
    }

    /**
     * @param Account $account
     * @param User $uploader
     * @param string $destinationPath
     * @param array $uploadedPhotos
     */
    public static function savePhotosOrFail(Account $account, User $uploader, string $destinationPath, array $uploadedPhotos)
    {

        if (empty($uploadedPhotos)) {
            throw new InvalidArgumentException("Empty photos passed");
        }

        foreach ($uploadedPhotos as $uploadedPhoto) {

            if (in_array(strtolower($uploadedPhoto->extension()), self::VALID_PHOTO_EXTENSIONS)) {

                $fileNameWithHashAndExtension = self::generateHashToFileName($uploadedPhoto->getClientOriginalName());

                $path = Storage::disk('s3')->putFileAs(
                    $destinationPath, $uploadedPhoto, $fileNameWithHashAndExtension, 'public'
                );

                // Store in photos table
                $newPhoto = new Photo;
                $newPhoto->owner_user_id = $uploader->id;
                $newPhoto->account_id = $account->id;
                $newPhoto->path = $path;
                $newPhoto->url = $newPhoto->getUrlAttribute();
                $newPhoto->is_active = true;

                $newPhoto->save();

            }
        }

    }
}
