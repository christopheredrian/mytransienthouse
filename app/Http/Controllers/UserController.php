<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

    public function create(Request $request)
    {
        $defaultPassword = "password";

        $user = new User();
        $user->password = Hash::make($defaultPassword);
        $user->email = $request->email;
        $user->name = $request->name;
        $user->role = $request->role;

        if (!$user->save()) {
            throw new \ErrorException("Was unable to create user");
        }

        return response()->json([
            "data" => $user->toArray()
        ]);

    }

}
