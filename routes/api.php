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

Route::get('initialize_user', function (Request $request) {

    /**
     * todo: chris add to controller
     */
    $response = [
        'error' => 'Forbidden',
        'message' => 'Forbidden.'
    ];

    try {
        $apiToken = $request->api_token ?? null;

        if (empty($apiToken)) {
            throw new Exception("Empty token");
        }

        $user = User::findByApiTokenOrFail($apiToken);


        if (!$user) {
            throw new Exception("Entity not valid");
        }

        $response = $user;


    } catch (Exception $exception) {
        $response['message'] = $exception->getMessage();
    }

    return $response;

});

Route::middleware('auth:api')->group(function () {
    /**
     * Authenticated Routes
     */


    Route::get('users', 'UserController@users');
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
