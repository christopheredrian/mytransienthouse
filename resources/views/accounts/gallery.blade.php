@extends('layouts.spa')


@section('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css">
@endsection

@section('scripts')
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

    @foreach($imageMap as $directory => $imagePaths)

        <h2 class="text-center mt-5">{{$directory}}</h2>
        <div class="m-5"></div>
        <div class="lightgallery text-center">
            @if(!empty($imagePaths))
                @foreach($imagePaths as $imagePath)
                    <a href="{{$imagePath}}">
                        <img class="img img-thumbnail" style="width: 20vw" src="{{$imagePath}}" alt="Image {{$directory}}">
                    </a>
                @endforeach
            @endif
        </div>


    @endforeach

@endsection
