<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
Route::post('register', 'Auth\RegisterController@register');

Route::get('initialize_user', function (Request $request) {
    $user = $request->user();

    if ($user) {
        return $user;
    }

    return [
        'error' => 'Not logged in'
    ];
});

Route::middleware('auth:api')->group(function () {
    /**
     * Authenticated Routes
     */

    // Get logged in user
//    Route::get('initialize_user', function (Request $request) {
//        return $request->user();
//    });

});


Route::get('test', function () {
    $data = [];

    foreach (range(1, 100) as $count) {
        $data[] = [
            "id" => $count,
            "content" => "Data {$count} from server",
        ];
    }
    return $data;
});

//  todo: add to authenticated routes later on
Route::get('users', 'UserController@users');

