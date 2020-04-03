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

        $users = User::paginate(5);

        return $users;

    }

    /**
     * @param Request $request
     * @return JsonResponse|Response
     * @throws TO-DO: ValidationException
     */
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

    /**
     * @param Request $request
     * @return JsonResponse|Response
     * @throws TO-DO: ValidationException
     */
    public function update(Request $request)
    {

        $user = User::where('id', $request->id)->first();

        $user->email = $request->email;
        $user->name = $request->name;
        $user->role = $request->role;

        if (!$user->save()) {
            throw new \ErrorException("Was unable to update user");
        }

        return response()->json([
            "data" => $user->toArray()
        ]);

    }

    /**
     * @param Request $request
     * @return JsonResponse|Response
     * @throws TO-DO: ValidationException
     */
    public function upsert(Request $request)
    {

        if ($request->id) {
            $this->update($request);
        } else {
            $this->create($request);
        }

        // Problematic. Discuss with Chris.
//        $user = User::updateOrCreate(
//            ['email' => $request->originalEmail],
//            [
//                'name' => $request->name,
//                'email' => $request->email,
//                'role' => $request->role,
//            ]
//        );

//        return response()->json([
//            "data" => $user->toArray()
//        ]);


    }

}
