<?php
/**
 * Created by PhpStorm.
 * User: seand
 * Date: 4/30/20
 * Time: 3:35 PM
 */

namespace App\Http\Controllers;


use App\Faq;
use App\Utilities\PhotoAlbumUtilities;

class ApiPublicController extends ApiAuthController
{
    public function business() {
        $account = $this->account;

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $photos);
    }

    public function index()
    {

        $faqs = Faq::where('account_id', $this->account->id)
            ->get();

        $photoAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        return view('public.index', [
            'faqs' => $faqs,
            'photoAlbums' => $photoAlbums
        ]);
    }

}