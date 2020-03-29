<?php

namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{

    /**
     * @param string $handle
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function users(string $handle = null)
    {

            $usersData = [];
            $users = User::all();

            foreach ($users as $user) {
                $usersData[] = $user->toArray();
            }

            return $usersData;

    }

}
