<?php
/**
 * Created by PhpStorm.
 * User: seand
 * Date: 4/30/20
 * Time: 3:35 PM
 */

namespace App\Http\Controllers;


use App\Account;
use App\Faq;
use App\Utilities\PhotoAlbumUtilities;
use App\Utilities\UiUtilities;
use Illuminate\Http\Request;

class ApiPublicController extends ApiController
{
    public function account(Request $request)
    {
        $subdomain = $this->getSubdomain($request->url());

        $account = Account::findOrThrowBySubdomain($subdomain);
        $ui = UiUtilities::getForAccount($account);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
            "ui" => $ui,
            "account" => $account
        ]);
    }

    public function getSubdomain($url)
    {

        // in case scheme relative URI is passed, e.g., //www.google.com/
        $url = trim($url, '/');

        // If scheme not included, prepend it
        if (!preg_match('#^http(s)?://#', $url)) {
            $url = 'http://' . $url;
        }

        $urlParts = parse_url($url);

        // remove www
        $domain = preg_replace('/^www\./', '', $urlParts['host']);

        $subdomain = explode('.', $domain)[0];

        return $subdomain;
    }


}