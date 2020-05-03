<?php

namespace App\Http\Controllers;

use App\Photo;
use App\SupportRequest;
use Exception;
use App\Faq;
use App\PhotoAlbum;
use App\Utilities\PhotoAlbumUtilities;
use App\Utilities\UiUtilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function supportRequest(Request $request)
    {

        try {

            $this->validate($request, [
                'phone' => 'min:10|max:15|required',
                'full_name' => 'required|max:255',
                'subject' => 'required|max:255',
                'body' => 'required|max:1000',
                'email' => 'email',
            ]);

            $supportRequest = new SupportRequest();
            $supportRequest->account_id = $this->account->id;
            $supportRequest->email = $request->email;
            $supportRequest->status = SupportRequest::STATUS_PENDING;
            $supportRequest->full_name = $request->full_name;
            $supportRequest->phone = $request->phone;

            $supportRequest->subject = $request->subject;
            $supportRequest->body = $request->body;
            $supportRequest->reference_number = SupportRequest::generateReferenceNumber($this->account);

            if (!$supportRequest->save()) {
                throw new InvalidArgumentException("There was a problem saving the support request");
            }

            return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
                'referenceNumber' => $supportRequest->reference_number
            ]);

        } catch (Exception $exception) {
            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }

    public function featuredPhotoAlbums()
    {

        $photoAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        if (!$photoAlbums) {
            throw new InvalidArgumentException("Photo albums not found");
        }

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $photoAlbums);

    }

    public function allPhotos()
    {
        $photos = DB::table('photos')
            ->where('account_id', '=', $this->account->id)
            ->whereNull('deleted_at')
            ->select('photos.*')
            ->get();

        $allPhotosCount = Photo::where('account_id', $this->account->id)->count();
        $otherAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
            'photos' => $photos,
            'otherAlbums' => $otherAlbums,
            'allPhotosCount' => $allPhotosCount
        ]);
    }

    public function photoAlbumPhotos($photoAlbumId)
    {

        try {

            /** @var PhotoAlbum $faq */
            $photoAlbum = PhotoAlbum::find($photoAlbumId);

            if (!$photoAlbum) {
                throw new InvalidArgumentException("Album not found");
            }

            if ($photoAlbum->account_id !== $this->account->id) {
                throw new InvalidArgumentException("Forbidden.");
            }

            $allPhotosCount = Photo::where('account_id', $this->account->id)->count();
            $otherAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

            $photos = DB::table('photos')
                ->join('photo_album_photos', 'photos.id', '=', 'photo_album_photos.photo_id')
                ->where('photo_album_photos.photo_album_id', '=', $photoAlbumId)
                ->select('photos.*')
                ->get();

            return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
                'photos' => $photos,
                'photoAlbum' => $photoAlbum,
                'otherAlbums' => $otherAlbums,
                'allPhotosCount' => $allPhotosCount
            ]);

        } catch (Exception $exception) {
            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }

}