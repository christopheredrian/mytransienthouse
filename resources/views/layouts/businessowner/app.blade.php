<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $account->business_name }}</title>

    <!-- Custom fonts for this template-->
    <link href="{{ asset('sbadmin2/vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="{{ asset('sbadmin2/css/sb-admin-2.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href={{ asset('dropzone/dist/dropzone.css') }}>
</head>

<body id="page-top">

<div id="wrapper">

    @include('layouts.businessowner.sidebar')

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

        <!-- Main Content -->
        <div id="content">
            @include('layouts.businessowner.topbar')
            <div class="container-fluid">
                @yield('content')
            </div>
        </div>
        <!-- End of Main Content -->

        @include('layouts.businessowner.footer')

    </div>

</div>

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

@include('layouts.businessowner.logoutmodal')

<!-- Bootstrap core JavaScript-->
<script src={{ asset('sbadmin2/vendor/jquery/jquery.min.js')  }}></script>
<script src={{ asset('sbadmin2/vendor/bootstrap/js/bootstrap.bundle.min.js') }}></script>

{{--<!-- Core plugin JavaScript-->--}}
<script src={{ asset('sbadmin2/vendor/jquery-easing/jquery.easing.min.js') }}></script>

{{--<!-- Custom scripts for all pages-->--}}
<script src="{{ asset('sbadmin2/js/sb-admin-2.min.js') }}"></script>
</body>

</html>
