<?php

namespace App\Http\Controllers;

use App\Faq;
use App\Utilities\PhotoAlbumUtilities;
use App\Utilities\UiUtilities;
use Illuminate\Http\Request;
use InvalidArgumentException;

class ApiPublicController extends ApiController
{
    public function account()
    {

        $ui = UiUtilities::getForAccount($this->account);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
            "ui" => $ui,
            "account" => $this->account
        ]);

    }

    public function faqs()
    {

        $faqs = Faq::where('account_id', $this->account->id)
            ->get();

        if (!$faqs) {
            throw new InvalidArgumentException("Faq not found");
        }

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $faqs);

    }

    public function featuredPhotoAlbums()
    {

        $photoAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        if (!$photoAlbums) {
            throw new InvalidArgumentException("Photo albums not found");
        }

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $photoAlbums);

    }

}