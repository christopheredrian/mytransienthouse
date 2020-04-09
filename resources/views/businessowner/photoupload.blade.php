@extends('layouts.business-owner.app')

@section('content')
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Photos</h1>

    <div class="row">
        <div class="col-lg-4">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card bg-white border-left-success shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Photos used in customer page
                                    </div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">4</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-photo-video fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total Photos
                                    </div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">50</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-8">
            <div class="dropzone-form col-xl-12 col-lg-12">
                <div class="content">
                    <form action="/upload" class="dropzone"></form>
                </div>
            </div>
        </div>
    </div>


    <script src={{ asset('dropzone/dist/dropzone.js') }}></script>
    <link rel="stylesheet" href={{ asset('dropzone/dist/dropzone.css') }}>

    <script>
        var CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone(".dropzone", {
            maxFilesize: 3,  // 3 mb
            acceptedFiles: ".jpeg,.jpg,.png",
        });
        myDropzone.on("sending", function (file, xhr, formData) {
            formData.append("_token", CSRF_TOKEN);
        });
    </script>

@endsection
