<?php
/**
 * Created by PhpStorm.
 * User: seand
 * Date: 4/11/20
 * Time: 4:34 PM
 */

namespace App\Http\Controllers;


use App\Account;
use App\Photo;
use App\S3Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PhotoController
{

    public function photos(Request $request) {

        $photos = Photo::where('owner_user_id', $request->id)
            ->get();

        return response()->json([
            "data" => $photos->toArray()
        ]);

    }

    public function uploadPhoto(Request $request) {

        if ($request->hasFile('photos') && strlen($request->userId) != 0) {

            $account = Account::where('owner_user_id', $request->userId)
                ->first();

            $destinationPath =
                S3Utilities::generateDestinationPath($request->userId, $account->subdomain);

            S3Utilities::uploadPhotos(
                $destinationPath,
                $request->file('photos'),
                $account->id
            );
        }

        // DISCUSS w/ Chris.
        // Problematic since photos should be filtered by account_id
        // Getting of account is prohibited due to current setup of this controller
        $photos = Photo::where('owner_user_id', $request->userId)
            ->get();

        return response()->json([
            "data" => $photos->toArray()
        ]);

    }

    public function deletePhoto(Request $request) {

        $photo = Photo::find($request->photoId);
        $photo->delete();

        // DISCUSS w/ Chris.
        $photos = Photo::where('owner_user_id', $request->userId)
            ->get();

        return response()->json([
            "data" => $photos->toArray()
        ]);

    }
}