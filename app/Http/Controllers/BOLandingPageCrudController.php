<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BOLandingPageCrudController extends ApplicationController
{
    public function test()
    {
        dd($this->account->subdomain);
    }

    public function dashboard()
    {
        return view('businessowner.dashboard');
    }

    public function earnings()
    {
        return view('businessowner.earnings');
    }

    // todo: sean add fns here for images CRUD

    public function showPhotoUpload()
    {
        return view('businessowner.photoupload');
    }

    public function upload(Request $request)
    {
        // todo: Integration with S3
        if ($request->hasFile('file')) {

            $disk = env('APP_ENV') === 'local' ? 'local' : 's3';

            $destinationPath = 'photos/';
            $validExtensions = array("jpeg", "jpg", "png");

            $fileNameWithExtension = $request->file('file')->getClientOriginalName();
            $fileExtension = $request->file('file')->extension();

            if (in_array(strtolower($fileExtension), $validExtensions)) {

                $path = $request->file('file')->storeAs(
                    $destinationPath,
                    $fileNameWithExtension,
                    $disk
                );

                // todo: Store in database (images table)
            }

        }
    }
}
