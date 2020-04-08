<?php

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class ApplicationController extends Controller
{

    /**
     * @var Account $account
     */
    protected $account = null;

    /**
     * ApplicationController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $subdomain = $request->route()
            ->parameter('subdomain'); // subdomain

        $this->account = Account::findOrThrowBySubdomain($subdomain);

        /**
         * Add account variable to all views
         */
        View::share('account', $this->account);
    }

}
