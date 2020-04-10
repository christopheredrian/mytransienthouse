<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>Login - SB Admin Pro</title>
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
<body class="bg-primary">
<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header justify-content-center">
                                <h3 class="font-weight-light my-4">
                                    Login
                                </h3>
                            </div>
                            <div class="card-body">
                                <form method="post" action="{{ route('login') }}">
                                    @csrf
                                    <div class="form-group">
                                        <label for="email"
                                               class="small mb-1">{{ __('E-Mail Address') }}
                                        </label>

                                        <input id="email" type="email"
                                               class="form-control py-4 @error('email') is-invalid @enderror"
                                               name="email"
                                               value="{{ old('email') }}" required autocomplete="email" autofocus>

                                        @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    </div>

                                    <div class="form-group">
                                        <label for="password"
                                               class="small mb-1">
                                            {{ __('Password') }}
                                        </label>

                                        <input id="password" type="password"
                                               class="form-control py-4 @error('password') is-invalid @enderror"
                                               name="password"
                                               required
                                        >

                                        @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    </div>



{{--                                    <div class="form-group">--}}
{{--                                        <div class="custom-control custom-checkbox">--}}
{{--                                            <input class="custom-control-input" type="checkbox" name="remember"--}}
{{--                                                   id="remember" {{ old('remember') ? 'checked' : '' }}>--}}

{{--                                            <label class="custom-control-label" for="remember">--}}
{{--                                                {{ __('Remember Me') }}--}}
{{--                                            </label>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}

                                    <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">

                                        @if (Route::has('password.request'))
                                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                                {{ __('Forgot Your Password?') }}
                                            </a>
                                        @endif

                                        <button type="submit" class="btn btn-primary">
                                            {{ __('Login') }}
                                        </button>
                                    </div>

                                </form>
                            </div>
                            <div class="card-footer text-center">
                                <div class="small"><a href="register-basic.html">Need an account? Sign up!</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <div id="layoutAuthentication_footer">
        <footer class="footer mt-auto footer-dark">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 small">Copyright &copy; mytransienthouse {{ date('Y') }}</div>
                    <div class="col-md-6 text-md-right small">
                        {{--                        <a href="#!">Privacy Policy</a>--}}
                        &middot;
                        {{--                        <a href="#!">Terms &amp; Conditions</a>--}}
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
        crossorigin="anonymous"></script>
<script src="js/scripts.js"></script>
</body>
</html>
