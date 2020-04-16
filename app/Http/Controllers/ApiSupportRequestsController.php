<?php

namespace App\Http\Controllers;

use App\SupportRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiSupportRequestsController extends ApiAuthController
{

    /**
     * Fetch all support requests
     * @param Request $request
     * @return JsonResponse
     */
    public function all(Request $request)
    {

        try {

            $supportRequests = SupportRequest::query();
            $supportRequests->where('account_id', $this->account->id);


            if ($request->status) {

                if (!in_array($request->status, [SupportRequest::STATUS_PENDING, SupportRequest::STATUS_MARKED_AS_READ])) {
                    throw new \InvalidArgumentException("Invalid status {$request->status}");
                }

                $supportRequests->where('status', $request->status);
            }

            /**
             * Compile Query
             */
            $supportRequests = $supportRequests->get();

            return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $supportRequests);

        } catch (Exception $exception) {
            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }
}
