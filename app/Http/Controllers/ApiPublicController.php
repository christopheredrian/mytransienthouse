<?php

namespace App\Http\Controllers;

use App\Account;
use App\Utilities\UiUtilities;
use App\Utilities\URLUtilities;
use Illuminate\Http\Request;

class ApiPublicController extends ApiController
{
    public function account(Request $request)
    {
        $subdomain = URLUtilities::getSubdomain($request->url());

        $account = Account::findOrThrowBySubdomain($subdomain);

        $ui = UiUtilities::getForAccount($account);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
            "ui" => $ui,
            "account" => $account
        ]);
    }

}