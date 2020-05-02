<?php

namespace App\Http\Controllers;

use App\Utilities\UiUtilities;
use Illuminate\Http\Request;
use InvalidArgumentException;

class ApiPublicController extends ApiController
{
    public function account(Request $request)
    {

        $ui = UiUtilities::getForAccount($this->account);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', [
            "ui" => $ui,
            "account" => $this->account
        ]);
    }

}