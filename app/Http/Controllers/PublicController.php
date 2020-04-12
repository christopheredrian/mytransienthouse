<?php

namespace App\Http\Controllers;

use App\Faq;
use Illuminate\Http\Request;

class PublicController extends ApplicationController
{
    public function index()
    {

        $faqs = Faq::where('account_id', $this->account->id)
            ->get();

        return view('public.index', [
            'faqs' => $faqs
        ]);
    }
}
