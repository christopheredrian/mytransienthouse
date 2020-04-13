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

class PhotoController
{

    public function index($subdomain) {

        $account = Account::where('subdomain', '=', $subdomain)
            ->first();

        $ownerUserId = $account->owner_user_id;
        $businessName = $account->business_name;

        $photoURLs = DB::table('photos')
            ->where('owner_user_id','=', $ownerUserId)
            ->whereNull('deleted_at')
            ->pluck('url');

        return view('public.gallery', [
            'photoURLs' => $photoURLs,
            'businessName' => $businessName
        ]);
    }

}