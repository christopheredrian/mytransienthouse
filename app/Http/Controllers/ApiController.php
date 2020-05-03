<?php

namespace App\Http\Controllers;

use App\Account;
use App\Utilities\URLUtilities;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;

class ApiController extends Controller
{

    const STATUS_SUCCESS = 'success';
    const STATUS_ERROR = 'error';

    /** @var Account */
    protected $account;

    public function __construct(Request $request)
    {

        $this->middleware(function ($request, $next) {
            $subdomain = URLUtilities::getSubdomain($request->url());
            $this->account = Account::findOrThrowBySubdomain($subdomain);

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
