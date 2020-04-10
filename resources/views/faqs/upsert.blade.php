@extends('layouts.business-owner.app')

@section('page-title')
    <title>FAQs - {{$account->business_name}}</title>
@endsection

@section('content')

    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-lg-9">
                <div class="card mb-4">
                    <div class="card-header">Create - Frequently Asked Question</div>
                    <div class="card-body">
                        <div class="sbp-preview">
                            <div class="sbp-preview-content">
                                <form method="post"
                                      action="/bo/faqs/upsert">
                                    @csrf

                                    @if(!empty($faq->id ?? null))
                                        <input type="hidden" name="id" value="{{$faq->id}}">
                                    @endif

                                    @if ($errors->any())
                                        <div class="alert alert-danger p-3 py-2 my-4">
                                            <ul class="list-unstyled">
                                                @foreach ($errors->all() as $error)
                                                    <li>{{ $error }}</li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    @endif


                                    <div class="form-group">
                                        <label for="faq_question">FAQ Label</label>
                                        <input class="form-control" id="faq_question" type="text"
                                               placeholder="Question Label" name="faq_question"
                                               value="{{ old('faq_question', $faq->faq_question ?? null) }}"
                                        />
                                    </div>


                                    <div class="form-group">
                                        <label for="faq_answer">
                                            FAQ Answer
                                        </label>
                                        <textarea name="faq_answer" class="form-control" id="faq_answer"
                                                  rows="3">{{old('faq_answer', $faq->faq_answer ?? null)}}</textarea>
                                    </div>


                                    <div class="text-right">
                                        <button class="btn btn-primary text-right">Save</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

@endsection
