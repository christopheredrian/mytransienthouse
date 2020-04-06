<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

//    /**
//     * @param Request $request
//     * @return JsonResponse|Response
//     * @throws ValidationException
//     */
//    public function login(Request $request)
//    {
//        $this->validateLogin($request);
//
//        if ($this->attemptLogin($request)) {
//            /** @var User $user */
//            $user = $this->guard()->user();
//            $user->generateToken();
//
//            return response()->json($user->toArray());
//        }
//
//        return $this->sendFailedLoginResponse($request);
//    }

//    /**
//     * @param Request $request
//     * @return JsonResponse
//     */
//    public function logout(Request $request)
//    {
//        /** @var User $user */
//        $user = Auth::guard('api')->user();
//
//        if ($user) {
//            $user->api_token = null;
//            $user->save();
//        }
//
//        return response()->json([
//            'data' => 'User logged out.'
//        ], 200);
//    }
}
