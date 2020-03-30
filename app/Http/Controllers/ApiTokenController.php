<?php

namespace App\Http\Controllers;

use App\User;
use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use InvalidArgumentException;

class ApiTokenController extends Controller
{
    /**
     * @param Request $request
     * @return Authenticatable|array
     */
    public function initializeUser(Request $request)
    {

        $response = [
            'error' => 'Forbidden',
            'message' => 'Forbidden.'
        ];

        try {
            $userForDevelopment = $this->devUserTestUser();

            if ($userForDevelopment) {
                return $userForDevelopment->toArray();
            }

            $apiToken = $request->api_token ?? null;

            if (empty($apiToken)) {
                throw new InvalidArgumentException("Empty token");
            }

            $user = User::findByApiTokenOrFail($apiToken);


            if (!$user) {
                throw new InvalidArgumentException("Forbidden.");
            }

            $response = $user;


        } catch (Exception $exception) {
            $response['message'] = $exception->getMessage();
        }

        return $response;
    }

    /**
     * @return User|null
     */
    private function devUserTestUser(): ?User
    {
        $user = $userId = null;

        if (env('APP_ENV') === 'local') {

            /**
             * Logging in as user id n
             */
            if (env('LOCAL_DEV_USER') === 'chris') {
                // LOCAL_DEV_USER=chris on .env
                $userId = 1;// chris - admin local

            }

            // todo: sean - add local admin user here
        }

        // validate user
        /** @var User $userFound */
        $userFound = User::findOrFail($userId);

        if ($userFound) {
            // login this user on Auth
            Auth::loginUsingId($userId);

            if (!$userFound->api_token) {
                // user has no token yet - create one
                $userFound->generateToken();
            }
            $user = $userFound;
        }

        return $user;
    }
}
