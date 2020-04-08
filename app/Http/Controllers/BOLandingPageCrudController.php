<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BOLandingPageCrudController extends ApplicationController
{
    public function test(){
        dd($this->account->subdomain);
    }

    public function dashboard(){
        return view('businessowner.dashboard');
    }

    // todo: sean add fns here for images CRUD
}
