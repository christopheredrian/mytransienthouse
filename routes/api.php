<?php

use App\User;
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
Route::get('initialize_user', 'ApiTokenController@initializeUser');

/**
 * User Routes
 */

Route::group(['prefix' => 'users'], function() {
    Route::get('/', 'UserController@users');
    Route::get('/{id}', 'UserController@user');
    Route::post('/upsert', 'UserController@upsert');
});


Route::middleware('auth:api')->group(function () {
    /**
     * Authenticated Routes
     */
    // Route::get('users', 'UserController@users');
    /**
     * Test route
     */
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
