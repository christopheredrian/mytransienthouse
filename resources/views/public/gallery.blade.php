@extends('layouts.public.app')

@section('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css">
    <style>
        .photo {
            width: 100%;
            height: 210px;
            object-fit: cover;
            object-position: 50% 0%;
        }

        .mini-photo {
            height: 140px
        }

        @media (min-width: 599px) {
            .photo {
                height: 230px;
            }
        }

        @media (max-width: 600px) {
            .mini-photo {
                height: 174px;
            }
        }

        @media (min-width: 790px) {
            .mini-photo {
                height: 180px;
            }
        }

        @media (min-width: 990px) {
            .mini-photo {
                height: 142px;
            }
        }

        @media (min-width: 1000px) {
            .mini-photo {
                height: 160px;
            }
        }

        @media (min-width: 1200px) {
            .mini-photo {
                height: 140px;
            }
        }
    </style>
@endsection

@section('content')
    <header class="page-header page-header-dark bg-gradient-primary-to-secondary">
        <div class="page-header-content">
            <div class="container text-center">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <h1 class="page-header-title mb-3">All Photos</h1>
                        <p class="page-header-text mb-0">
                            Photos for {{ $businessName }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="svg-border-rounded text-light">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                 fill="currentColor">
                <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
            </svg>
        </div>
    </header>

    <section class="bg-light pb-10">
        <div class="container">
            <div class="row" id="selector">

                @if(isset($photoURLs) && !empty($photoURLs))
                    @foreach($photoURLs as $photoURL)

                        @switch($loop->iteration)
                        @case(1)
                        <div class="col-md-6 col-xl-4 mb-5 mt-n5 item" data-src="{{ $photoURL }}">
                            @break
                            @case(2)
                            <div class="col-md-6 col-xl-4 mb-5 mt-md-n5 item" data-src="{{ $photoURL }}">
                                @break
                                @case(3)
                                <div class="col-md-6 col-xl-4 mb-5 mt-xl-n5 item" data-src="{{ $photoURL }}">
                                    @break
                                    @default
                                    <div class="col-md-6 col-xl-4 mb-5 item" data-src="{{ $photoURL  }}"">
                                        @break
                                        @endswitch

                                        <a class="card card-portfolio h-100" href="#">
                                            <img class="card-img-top photo" src="{{ $photoURL }}" alt="..."/>
                                        </a>
                                    </div>

                                    @endforeach
                                    @endif
                                </div>
                                <div class="svg-border-rounded text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                                         fill="currentColor">
                                        <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
                                    </svg>
                                </div>
                            </div>
    </section>

    <section class="bg-white py-4">
        <div class="container">
            <h2 class="mb-4">Albums</h2>
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6 mb-5">
                    <a class="card lift h-100" href="/gallery">
                        <div class="card-flag card-flag-dark card-flag-top-right card-flag-lg">
                            {{ $allPhotosCount }}
                            {{ $allPhotosCount === 1 ? ' photo' : ' photos' }}
                        </div>
                        <img class="card-img-top" src="https://source.unsplash.com/tG36rvCeqng/800x500" alt="..." />
                        <div class="card-body p-3">
                            <div class="card-title small mb-0">All Photos</div>
                            <div class="text-xs text-gray-500">All photos for this residence</div>
                        </div>
                    </a>
                </div>

                @foreach($otherAlbums as $otherAlbum)
                    <div class="col-xl-3 col-lg-4 col-md-6 mb-5">
                        <a class="card lift h-100" href="/photo-album/{{ $otherAlbum->id }}">
                            <div class="card-flag card-flag-dark card-flag-top-right card-flag-lg">
                                {{ $otherAlbum->getPhotoAlbumPhotosCount() }}
                                {{ $otherAlbum->getPhotoAlbumPhotosCount() === 1 ? ' photo' : ' photos' }}
                            </div>
                            <img class="card-img-top photo mini-photo" src="{{ $otherAlbum->url }}" alt="..." />
                            <div class="card-body p-3">
                                <div class="card-title small mb-0">{{ $otherAlbum->name }}</div>
                                <div class="text-xs text-gray-500">
                                    {{ strlen($otherAlbum->description) <= 30 ? $otherAlbum->description : substr($otherAlbum->description, 0, 30) . "..."}}
                                </div>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    <section class="bg-white pt-0 pb-10">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-lg-8 col-md-10 text-center py-5 mb-0">
                    <h2>Ready to get started?</h2>
                    <p class="lead text-gray-500">
                        We'd love to hear about your vacation stay inquiries and needs. We are currently accepting reservations!
                    </p>
                    <a class="btn btn-primary btn-marketing rounded-pill" href="/contact">BOOK NOW</a>
                </div>
            </div>
        </div>
        <div class="svg-border-rounded text-light">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none"
                 fill="currentColor">
                <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
            </svg>
        </div>
    </section>

@endsection

@section('scripts')
    <script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery-all.min.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#selector').lightGallery({
                selector: '.item'
            });
        });
    </script>
@endsection
