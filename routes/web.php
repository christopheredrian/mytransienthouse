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

/**
 * Auth
 */
Auth::routes(['register' => false]);
Route::get('logout', 'Auth\LoginController@logout');
Route::get('admin', 'Auth\LoginController@showLoginForm'); // alias for BO login

Route::get('home', 'StaticController@home');
Route::get('greetings/{handle}', 'EcardController@handle');


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

    // START: Public
    Route::get('contact', 'PublicController@contact');
    Route::post('contact', 'PublicController@submit');
    Route::get('gallery', 'PhotoController@index');
    Route::get('/', 'PublicController@index');
    // END: Public

    Route::group(['middleware' => 'auth', 'prefix' => 'bo'], function (\Illuminate\Routing\Router $router) {

        Route::get('/{path?}', function () {
            return view('business-owner');
        });

    });

    // START: Public Routes

    // END: Public Routes

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
    Route::get('initialize_user', function () {
        return Auth::user();
    });
    Route::group(['prefix' => 'users'], function () {
        /**
         * Users
         * /api/users/
         */
        Route::get('/', 'UserController@users');
        Route::get('/{id}', 'UserController@user');
        Route::post('/upsert', 'UserController@upsert');
    });

    Route::group(['prefix' => 'photos'], function () {
        /**
         * Users
         * /api/photos/
         */
        Route::get('/', 'ApiPhotoController@all');
        Route::post('/upload_photo', 'ApiPhotoController@upload');
        Route::post('/delete_photo', 'ApiPhotoController@delete');

    });

    Route::group(['prefix' => 'photo_albums'], function () {
        /**
         * Users
         * /api/photos/
         */
        Route::get('/', 'ApiPhotoAlbumController@all');
        Route::post('/upsert', 'ApiPhotoAlbumController@upsert');
        Route::post('/delete/{id}', 'ApiPhotoAlbumController@delete');
        Route::get('/selected_photos/{albumId}', 'ApiPhotoAlbumController@allSelectedPhotos');
        Route::get('/unselected_photos/{albumId}', 'ApiPhotoAlbumController@allUnselectedPhotos');

    });

    Route::group(['prefix' => 'faqs'], function () {
        Route::get('/', 'FaqsController@all');
        Route::get('/{id}', 'FaqsController@one');
        Route::post('/upsert', 'FaqsController@upsert');
        Route::post('/delete/{id}', 'FaqsController@delete');
    });

    Route::group(['prefix' => 'support_requests'], function () {
        Route::get('/', 'ApiSupportRequestsController@all');
    });

    // test route
    Route::post('test', 'StaticController@test');
});
