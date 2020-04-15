@extends('layouts.public.app')

@section('content')

    <div class="container bg-light">
        <div class="row pt-10 pb-10">
            <div class="col text-center">
                <p>
                    Thank you for your interest! We will get back to you soon <br>
                </p>
                <p class="font-weight-bold">
                    Please keep this for future reference<br>
                    Request Number: <strong>{{$reference_number}}</strong>
                </p>
            </div>
        </div>
    </div>

@endsection
