<?php

namespace App\Http\Controllers;

use App\Faq;
use App\SupportRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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

    public function contact()
    {
        return view('support_requests.form');
    }


    /**
     * @param Request $request
     * @throws ValidationException
     * @throws \Exception
     */
    public function submit(Request $request)
    {

        $this->validate($request, [
            'phone' => 'min:10|max:15|required',
            'email' => 'email',
            'full_name' => 'required|max:255',
            'subject' => 'max:255',
            'body' => 'max:1000'
        ]);

        $supportRequest = new SupportRequest();
        $supportRequest->account_id = $this->account->id;
        $supportRequest->email = $request->email;
        $supportRequest->status = SupportRequest::STATUS_PENDING;
        $supportRequest->full_name = $request->full_name;
        $supportRequest->phone = $request->phone;

        $supportRequest->subject = $request->subject;
        $supportRequest->body = $request->body;
        $supportRequest->reference_number = SupportRequest::generateReferenceNumber($this->account);

        $supportRequest->save();

        return view('support_requests.create_success', ['reference_number' => $supportRequest->reference_number]);

    }
}
