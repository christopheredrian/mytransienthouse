<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

$appDomain = env('APP_DOMAIN');
Auth::routes(['register' => false]);
Route::get('home', function () {
    return view('home');
});
Route::get('greetings/{handle}', 'EcardController@handle');

/**
 * React Test endpoints (Check mo to sean)
 * Reference /resources/js/components/AdminApp.js
 */

/**
 * End - React Test endpoints
 */


Route::domain("{account}.{$appDomain}")->group(function () {
    Route::get('/', 'ApplicationController@index');
});
Route::get('espr2', 'StaticController@espr2');
Route::get('logout', 'Auth\LoginController@logout');

Route::group([
    'middleware' => 'auth',
    'prefix' => 'api',
    // todo: add middleware for admin
], function () {
    /**
     * Authenticated routes
     */
    Route::group(['prefix' => 'users'], function () {
        /**
         * Users
         * /api/users/
         */
        Route::get('/', 'UserController@users');
        Route::get('/{id}', 'UserController@user');
        Route::post('/upsert', 'UserController@upsert');
    });

    // test route
    Route::post('test', function () {
        $data = [];

        foreach (range(1, 100) as $count) {
            $data[] = [
                "id" => $count,
                "content" => "Data {$count} from server",
            ];
        }
        return $data;
    });

});


Route::get('{url}', function () {
    return view('admin');
//})->where('url', 'admin.*')->middleware('auth');
})->where('url', '.*')->middleware('auth'); // todo: comment after redirect route is done - for roles
