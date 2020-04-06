<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse|Response
     * @throws TO-DO: ValidationException
     */
    public function user(string $userId)
    {

        $user = User::where('id', $userId)->first();

        return response()->json($user);

    }

    /**
     * @param Request $request
     * @return JsonResponse|Response
     * @throws TO-DO: ValidationException
     */
    public function users(Request $request)
    {

        $perPage = (int)($request->perPage);

        if($request->has('filter')){
            $users = User::where('name', 'like', '%' . $request->filter . '%')
                ->orWhere('email', 'like', '%' . $request->filter . '%')
                ->orWhere('role', 'like', '%' . $request->filter . '%')
                ->paginate($perPage);

        } else {
            $users = User::paginate($perPage);
        }

        return $users;

    }

    /**
     * @param Request $request
     * @return JsonResponse|Response
     * @throws TO-DO: ValidationException
     */
    public function upsert(Request $request)
    {

        // Default password is "password"
        $password = $request->password ? $request->password : "password";

        $user = User::updateOrCreate(
            ['id' => $request->id],
            [
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'password' => Hash::make($password)
            ]
        );

        return response()->json([
            "data" => $user->toArray()
        ]);

    }

}
