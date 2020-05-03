<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAuthController extends ApiController
{

    /** @var User */
    protected $user;

    public function __construct(Request $request)
    {

        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            $this->account = $this->user->account();

            return $next($request);
        });
    }

}
