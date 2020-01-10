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

$appDomain = env('APP_DOMAIN');
Auth::routes(['register' => false]);
Route::get('/greetings/{handle}', 'EcardController@handle');


Route::domain("{account}.{$appDomain}")->group(function () {
    Route::get('/', 'ApplicationController@index');
});
Route::get('espr2', function () {
    $directories = array_filter(glob('img/accounts/espiritu/*'), 'is_dir');

    $imageMap = [];
    if (!empty($directories)) {
        foreach ($directories as $directory) {

            $files = array_filter(glob("$directory/*"), 'is_file');

            $dirArr = explode('/', $directory);
            $mainDirName = $dirArr[count($dirArr) - 1] ?? 'uncategorized';
            foreach ($files as $file) {

                if (!isset($imageMap[$mainDirName])) {
                    $imageMap[$mainDirName] = [];
                }
                $imageMap[$mainDirName][] = "/$file";

            }
        }
    }

    return view('accounts.gallery', [
        'imageMap' => $imageMap
    ]);
});
