<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>{{ isset($account) ? $account->company_name : 'My Transient House' }}</title>
    <link href={{ asset('sb-kit-ui-pro/css/styles.css') }} rel="stylesheet"/>
    <link rel="icon" type="image/x-icon" href={{ asset('sb-kit-ui-pro/assets/img/favicon.png') }}/>
    <script data-search-pseudo-elements defer
            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.24.1/feather.min.js"
            crossorigin="anonymous"></script>

    @yield('styles')


</head>

<body>
<div id="layoutDefault">
    <div id="layoutDefault_content">
        <main class="bg-light">

            @include('layouts.public.navbar')

            @yield('content')


        </main>
    </div>

    @include('layouts.public.footer')
</div>

<script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
<script src={{ asset('sb-kit-ui-pro/js/scripts.js') }}></script>

@yield('scripts')

</body>
</html>
