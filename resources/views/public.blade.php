<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'My Transient House') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script data-search-pseudo-elements defer src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossorigin="anonymous"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <link href={{ asset('sb-kit-ui-pro/css/styles.css') }}  rel="stylesheet"/>

    <style>

        :root {
            --blue: #007bff;
            --indigo: #6610f2;
            --purple: #6f42c1;
            --pink: #e83e8c;
            --red: #dc3545;
            --orange: #fd7e14;
            --yellow: #ffc107;
            --green: #28a745;
            --teal: #20c997;
            --cyan: #17a2b8;
            --white: #fff;
            --gray: #6c757d;
            --gray-dark: #343a40;
            --primary: {{$ui['primary']}};
            --secondary: {{$ui['secondary']}};
            --success: {{$ui['success']}};
            --info: {{$ui['info']}};
            --warning: {{$ui['warning']}};
            --danger: {{$ui['danger']}};
            --light: #f8f9fa;
            --dark: #343a40;
            --breakpoint-xs: 0;
            --breakpoint-sm: 576px;
            --breakpoint-md: 768px;
            --breakpoint-lg: 992px;
            --breakpoint-xl: 1200px;
            --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

            --bg-primary: {{$ui['bg_primary'] ?? 'white'}};
            --nav-link: {{$ui['nav_link'] ?? 'white'}};
            --navbar-brand: {{$ui['navbar_brand'] ?? ''}};
            --footer: {{$ui['footer'] ?? ''}};
            --footer-bg: {{$ui['footer_bg'] ?? ''}};

            --gallery-bg: {{$ui['gallery_bg'] ?? ''}}

        }

        /* Buttons */
        .btn {
            border-color: transparent;
        }

        .btn-primary:hover {
            background-color: var(--secondary);
            border-color: transparent;
        }

        .btn-primary {
            background-color: var(--primary);
        }

        .btn-secondary {
            background-color: var(--secondary);
        }

        .btn-success {
            background-color: var(--success);
        }

        .btn-danger {
            background-color: var(--danger);
        }

        .btn-warning {
            background-color: var(--warning);
        }

        .btn-info {
            background-color: var(--info);
        }

        /*  Text   */
        .text-primary {
            color: var(--primary) !important;
        }

        .bg-primary {
            background-color: var(--bg-primary) !important;
        }

        .nav-link {
            color: var(--nav-link) !important;
        }

        .navbar-brand {
            color: var(--navbar-brand) !important;
        }

        .footer {
            color: var(--footer) !important;
        }

        .footer-bg {
            background-color: var(--footer-bg) !important;
        }

        .bg-img-cover .svg-border-angled polygon{
            color: var(--footer-bg) !important;
        }

    </style>

</head>
<body>

<div id="app">
    <div id="public-app"></div>
</div>

<script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
<script src={{ asset('sb-kit-ui-pro/js/scripts.js') }}></script>

</body>

</html>
