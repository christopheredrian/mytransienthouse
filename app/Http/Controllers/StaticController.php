<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Request;
use Illuminate\View\View;

class StaticController extends Controller
{
    /**
     * Main espr2 controller
     * todo: make dynamic
     * @return Factory|View
     */
    public function espr2()
    {
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
    }
}
