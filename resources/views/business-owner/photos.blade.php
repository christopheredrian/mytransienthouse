@extends('layouts.business-owner.app')

@section('page-title')
    <title>Photos - {{$account->business_name}}</title>
@endsection

@section('content')
    <main>
        <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
            <div class="container-fluid">
                <div class="page-header-content">
                    <h1 class="page-header-title">
                        <div class="page-header-icon"><i data-feather="edit-3"></i></div>
                        <span>Photos</span>
                    </h1>
                    <div class="page-header-subtitle">Photo overview and management of your residence</div>
                </div>
            </div>
        </div>

        <div class="container-fluid mt-n10">
            <div class="row">

                <div class="col-lg-4">
                    <div id="default ">
                        <div class="card mb-4 ">
                            <div class="card-header">Upload Photo/s</div>
                            <div class="card-body">
                                <div class="sbp-preview">
                                    <div class="sbp-preview-content">
                                        <form method="post" action="/bo/upload-photos" enctype="multipart/form-data">

                                            @csrf

                                            <div class="form-group">
                                                <input type="file" name="photos[]" class="form-control-file" multiple required>
                                            </div>
                                            <button class="btn btn-primary" type="submit">Upload</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div id="default ">
                        <div class="card mb-4 ">
                            <div class="card card-icon ">
                                <div class="row no-gutters">
                                    <div class="col-auto card-icon-aside bg-warning">
                                        <i data-feather="camera"></i>
                                    </div>
                                    <div class="col">
                                        <div class="card-body py-5">
                                            <h5 class="card-title">{{$photos->count()}} uploaded photos</h5>
                                            <p class="card-text">You can choose below which photos to display for your customers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div id="default">
                        <div class="card mb-4">
                            <div class="card-header">Gallery</div>
                            <div class="card-body">
                                <div class="sbp-preview mb-4">
                                    <div class="sbp-preview-content">
                                        <div class="row">

                                            @if(false)
                                                <p class="mx-auto">No photos in gallery</p>
                                            @else
                                                @foreach ($photos as $photo)
                                                    <div class="col-lg-3">
                                                        <div class="card">
                                                            <div>
                                                                <img class="card-img-top"
                                                                     src="{{ $photo->getUrlAttribute() }}" alt=" ..."
                                                                     style="width: 100%;object-fit: cover;height: 250px;object-position: 50% -0%">
                                                            </div>

                                                            <div class="card-body">
                                                                <button class="btn btn-outline-danger btn-sm float-right" type="button">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            @endif

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

@endsection
