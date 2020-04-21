<?php
/**
 * Created by PhpStorm.
 * User: seand
 * Date: 4/11/20
 * Time: 4:34 PM
 */

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Support\Facades\DB;

class PhotoController extends ApplicationController
{

    public function index($subdomain) {

        $photoURLs = DB::table('photos')
            ->where('account_id','=', $this->account->id)
            ->whereNull('deleted_at')
            ->pluck('url');

        return view('public.gallery', [
            'photoURLs' => $photoURLs,
            'businessName' => $this->account->business_name
        ]);
    }

}
