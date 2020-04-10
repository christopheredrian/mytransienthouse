<?php

namespace App\Http\Controllers;

use App\Faq;
use ErrorException;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class FaqsController extends ApplicationController
{
    /**
     * Display a listing of the resource.
     *
     * @return Factory|View
     */
    public function index()
    {
        $faqs = Faq::all();
        return view('faqs.index', compact('faqs'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|View
     */
    public function create()
    {
        return view('faqs.upsert');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse|Redirector
     * @throws ErrorException
     * @throws ValidationException
     */
    public function upsert(Request $request)
    {
        $this->validate($request, [
            'faq_question' => 'required|max:255',
            'faq_answer' => 'required|max:1000'
        ]);

        if (!empty($request->id)) {
            $faq = Faq::findOrFail($request->id);
        } else {
            // edit mode
            $faq = new Faq;
        }

        $faq->account_id = $this->account->id;
        $faq->user_id = Auth::user()->id;
        $faq->faq_question = $request->faq_question;
        $faq->faq_answer = $request->faq_answer;

        if (!$faq->save()) {
            throw new ErrorException(sprintf("An error occurred while saving entry"));
        }

        Session::flash("message", "Successfully added entry");

        return redirect('/bo/faqs');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Factory|View
     */
    public function edit($subdomain, $id)
    {
        $faq = Faq::findOrFail($id);
        return view('faqs.upsert', ['faq' => $faq]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @return RedirectResponse|Redirector
     * @throws ValidationException
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'id' => 'exists:faqs'
        ]);

        Faq::destroy($request->id);

        Session::flash("message", "Successfully deleted entry");
        return redirect('/bo/faqs');
    }
}
