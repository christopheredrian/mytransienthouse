@extends('layouts.public.app')


@section('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>

    <script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery-all.min.js"></script>


    <script type="text/javascript">
        $(document).ready(function () {
            $('.lightgallery').lightGallery({
                thumbnail: true
            });
        });
    </script>
@endsection



@section('content')

    <header class="page-header page-header-light bg-img-cover overlay overlay-light overlay-80"
            style='background-image: url("https://source.unsplash.com/R-LK3sqLiBw/1600x1200")'>
        <div class="page-header-content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">

                        <h1 class="text-center page-header-title">
                            {{ $photoURLs->count() !== 0 ? ($businessName . " Gallery") : "No uploaded photos yet"  }}
                        </h1>
                        <p class="text-center page-header-text mb-5">
                            {{ $photoURLs->count() !== 0 ?  'To maximize, tap on the photo!' : '' }}
                        </p>

                        <div class="m-5"></div>
                        <div class="lightgallery text-center">
                            @if($photoURLs->count() !== 0)
                                @foreach($photoURLs as $photoURL)
                                    <a href="{{$photoURL}}">
                                        <img class="img img-thumbnail"
                                             style="width: 20vw; object-fit: cover; max-height: 210px; max-width: 250px; object-position: 50% -0%;"
                                             src="{{$photoURL}}">
                                    </a>
                                @endforeach
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

@endsection
