<?php

namespace App\Http\Controllers;

use App\Account;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use InvalidArgumentException;

class ApiAuthController extends Controller
{

    const STATUS_SUCCESS = 'success';
    const STATUS_ERROR = 'error';

    /** @var User */
    protected $user;

    /** @var Account */
    protected $account;

    public function __construct(Request $request)
    {

        $this->middleware(function ($request, $next) {
            $this->user = Auth::user();
            $this->account = $this->user->account();

            return $next($request);
        });
    }


    public function getValidApiStatuses()
    {
        return [
            self::STATUS_ERROR,
            self::STATUS_SUCCESS,
        ];
    }

    /**
     * @param string $status
     * @throws InvalidArgumentException
     */
    private function validStatusOrFail(string $status)
    {

        if (!in_array($status, $this->getValidApiStatuses())) {
            throw new InvalidArgumentException();
        }

    }

    /**
     * @param string $status
     * @param string $message
     * @param array $data
     * @return JsonResponse
     */
    public function jsonApiResponse(string $status, string $message, $data = []): JsonResponse
    {

        $this->validStatusOrFail($status);

        $statusData = [
            'status' => $status,
            'message' => $message
        ];

        return response()
            ->json(array_merge($statusData, ['data' => $data]));
    }

}
