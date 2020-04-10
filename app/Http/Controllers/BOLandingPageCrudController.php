<?php

namespace App\Http\Controllers;

use App\Image;
use App\Photo;
use App\S3Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BOLandingPageCrudController extends ApplicationController
{


    public function index()
    {
        return view('business-owner.dashboard');
    }

    public function earnings()
    {
        return view('business-owner.earnings');
    }

    /**
     * Photos module
     */

    public function showPhotos()
    {
        $photos = Photo::where('owner_user_id', Auth::user()->id)
            ->get();

        return view('business-owner.photos', ['photos' => $photos]);
    }

    public function uploadPhotos(Request $request)
    {

        if ($request->hasFile('photos')) {

            $destinationPath = S3Utilities::generateDestinationPath(Auth::user()->id, $this->account->subdomain);

            S3Utilities::uploadPhotos(
                $destinationPath,
                $request->file('photos'),
                $this->account->id
            );
        }

        return redirect('/bo/photos');

    }

    public function deletePhoto(Request $request) {

        $photo = Photo::find($request->id);

        $photo->delete();

        return redirect('/bo/photos');

    }
}


