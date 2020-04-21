@extends('layouts.public.app')

@section('content')

    <div class="container bg-light">
        <div class="row pt-10 pb-10">
            <div class="col">

                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif


                <form method="post" action="/contact">
                    @csrf
                    <div class="form-row">
                        <div class="form-group col-md-4"><label class="text-dark" for="fullName">
                                Full name
                            </label>
                            <input class="form-control py-4"
                                   id="fullName"
                                   type="text"
                                   name="full_name"
                                   placeholder="Enter your name"
                                   value="{{old('full_name')}}"
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <label class="text-dark" for="phone">
                                Phone Number
                            </label>
                            <input name="phone"
                                   class="form-control py-4"
                                   id="phone"
                                   type="text"
                                   placeholder="Enter Phone Number" required value="{{old('phone')}}"/>
                        </div>
                        <div class="form-group col-md-4">
                            <label class="text-dark" for="email">
                                Email
                            </label>
                            <input name="email"
                                   class="form-control py-4"
                                   id="email"
                                   type="email"
                                   placeholder="Enter Email Address" value="{{old('email')}}"
                            />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <div class="form-group"><label class="text-dark" for="subject">Subject</label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    class="form-control"
                                    placeholder="Inquring for..."
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="text-dark" for="inputMessage">Message</label>
                        <textarea class="form-control py-3" id="inputMessage" type="text"
                                  placeholder="Enter your message..."
                                  name="body"
                                  rows="4">{{old('body')}}</textarea>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-primary btn-marketing mt-4" type="submit">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
