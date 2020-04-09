<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    @yield('page-title')


    <link href={{ asset('sb-admin-pro/css/styles.css') }}  rel="stylesheet"/>
    <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet"
          crossorigin="anonymous"/>
    <link rel="icon" type="image/x-icon" href={{ asset('sb-admin-pro/assets/img/favicon.png') }}/>
    <script data-search-pseudo-elements defer
            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.24.1/feather.min.js"
            crossorigin="anonymous"></script>
</head>
<body class="nav-fixed">

@include('layouts.business-owner.navbar')

<div id="layoutSidenav">

    @include('layouts.business-owner.sidebar')

    <div id="layoutSidenav_content">
        @yield('content')

        @include('layouts.business-owner.footer')
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
<script src={{ asset('sb-admin-pro/js/scripts.js') }}></script>

@yield('scripts')
</body>
</html>
