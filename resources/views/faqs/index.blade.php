@extends('layouts.business-owner.app')

@section('page-title')
    <title>FAQs - {{$account->business_name}}</title>
@endsection

@section('content')

    <div class="container-fluid mt-3">

        @if(\Illuminate\Support\Facades\Session::has('message'))
            <div class="alert alert-info">
                {{ \Illuminate\Support\Facades\Session::get('message') }}
            </div>
        @endif

        <div class="card mb-4">
            <div class="card-header">FAQs</div>
            <div class="card-body">
                <div class="datatable table-responsive">

                    <div class="text-right mb-3">
                        <a class="btn btn-success"
                           href="/bo/faqs/create">
                            Create
                        </a>
                    </div>

                    @if(empty($faqs) || count($faqs) < 1)

                        <div class="alert alert-info">
                            No data found.
                        </div>

                    @else
                        <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                            <tr>
                                <th>FAQ Question</th>
                                <th>FAQ Answer</th>
                                <th style="width: 90px;">Actions</th>
                            </tr>
                            </thead>

                            <tbody>

                            @foreach($faqs as $faq)
                                <tr>

                                    <td>{{$faq->faq_question}}</td>
                                    <td>{{$faq->faq_answer}}</td>
                                    <td>
                                        <a href="/bo/faqs/{{$faq->id}}/edit"
                                           class="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i
                                                data-feather="edit"></i>
                                        </a>
                                        <form style="display: inline" action="/bo/faqs/destroy" method="post">
                                            @csrf

                                            <input type="hidden" name="id" value="{{$faq->id}}">
                                            <button
                                                type="submit"
                                                class="btn btn-datatable btn-icon">
                                                <i data-feather="trash-2"></i>
                                            </button>
                                        </form>

                                    </td>
                                </tr>
                            @endforeach


                            </tbody>
                        </table>

                    @endif
                </div>
            </div>
        </div>

    </div>


@endsection

