<?php

namespace App\Http\Controllers;

use App\Account;
use App\Image;
use App\Photo;
use App\S3Utilities;
use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    // todo: sean add fns here for images CRUD

    public function showPhotos()
    {

        $photos = Photo::where('owner_user_id', Auth::user()->id)
            ->get();

        return view('business-owner.photos', ['photos' => $photos]);
    }

    public function uploadPhotos(Request $request)
    {

        // todo: Integration with S3
        if ($request->hasFile('photos')) {

            $destinationPath = S3Utilities::generateDestinationPath(Auth::user()->id, $this->account->subdomain);

            S3Utilities::uploadPhotos(
                $destinationPath,
                $request->file('photos'),
                $this->account->id
            );
        }

        return redirect('/photos');

    }
}


