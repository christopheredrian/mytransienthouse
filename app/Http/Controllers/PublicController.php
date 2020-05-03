<?php

namespace App\Http\Controllers;

use App\Faq;
use App\Photo;
use App\PhotoAlbum;
use App\Utilities\PhotoAlbumUtilities;
use App\SupportRequest;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use InvalidArgumentException;

class PublicController extends ApplicationController
{
    public function newIndex()
    {
        return view('public');
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

    /**
     * Contact form
     * @return Factory|View
     */
    public function contact()
    {
        return view('support_requests.form');
    }


    /**
     * @param Request $request
     * @return Factory|View
     * @throws ValidationException
     * @throws Exception
     */
    public function submit(Request $request)
    {

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

        $supportRequest->save();

        return view('support_requests.create_success', ['reference_number' => $supportRequest->reference_number]);

    }

    public function gallery()
    {

        $photoURLs = DB::table('photos')
            ->where('account_id', '=', $this->account->id)
            ->whereNull('deleted_at')
            ->pluck('url');

        $allPhotosCount = Photo::where('account_id', $this->account->id)->count();
        $otherAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        return view('public.gallery', [
            'photoURLs' => $photoURLs,
            'businessName' => $this->account->business_name,
            'otherAlbums' => $otherAlbums,
            'allPhotosCount' => $allPhotosCount
        ]);
    }

    public function photoAlbum($subdomain, $albumId)
    {

        $photoAlbum = PhotoAlbum::findOrFail($albumId);

        if ($photoAlbum->is_featured === null || $photoAlbum->is_featured === 0) {
            throw new InvalidArgumentException("Forbidden.");
        }

        $allPhotosCount = Photo::where('account_id', $this->account->id)->count();
//        $otherAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true, $albumId);
        $otherAlbums = PhotoAlbumUtilities::getPhotoAlbums($this->account->id, true);

        $photos = DB::table('photos')
            ->join('photo_album_photos', 'photos.id', '=', 'photo_album_photos.photo_id')
            ->where('photo_album_photos.photo_album_id', '=', $albumId)
            ->select('photos.*')
            ->get();

        return view('public.photo-album', [
            'photos' => $photos,
            'photoAlbum' => $photoAlbum,
            'otherAlbums' => $otherAlbums,
            'allPhotosCount' => $allPhotosCount
        ]);
    }
}
