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
Route::get('logout', 'Auth\LoginController@logout');
Route::get('home', 'StaticController@home');
Route::get('greetings/{handle}', 'EcardController@handle');

/**
 * React Test endpoints (Check mo to sean)
 * Reference /resources/js/components/AdminApp.js
 */

/**
 * End - React Test endpoints
 */

Route::domain("admin.{$appDomain}")->group(function () {
    // START: Admin Routes
    Route::get('/{path?}', function () {
        return view('admin');
    })->middleware('auth');
    // END: Admin Routes
});

Route::domain("{subdomain}.{$appDomain}")->group(function () {
    /**
     * Handle subdomain routing
     */
    // todo: Add protected routes via middleware (auth/business owners)

    // START: Public Routes

    // END: Public Routes

    Route::group(['middleware' => 'auth'], function () {

        // START: Business owner
        Route::get('test', 'BOLandingPageCrudController@test');
        Route::get('/', 'BOLandingPageCrudController@dashboard');
        Route::get('earnings', 'BOLandingPageCrudController@earnings');
        Route::get('upload-photos', 'BOLandingPageCrudController@showPhotoUpload');
        Route::post('upload', 'BOLandingPageCrudController@upload');
        // END: Business Owner Routes


    });

});

Route::get('espr2', 'StaticController@espr2');

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
    Route::post('test', 'StaticController@test');
});
