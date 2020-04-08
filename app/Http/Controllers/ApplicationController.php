<?php

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{


    /**
     * @var Account $account
     */
    protected $account = null;

    /**
     * ApplicationController constructor.
     */
    public function __construct(Request $request)

    {

        $account = $request->route()->parameter('account'); // subdomain
        // todo: load account and account settings from db
        $this->account = new Account($account);

    }

    public function index()
    {
        if ($this->account->subdomain === 'admin') {
            return view('admin');
        } else {
            dd($this->account);
        }
    }
}
