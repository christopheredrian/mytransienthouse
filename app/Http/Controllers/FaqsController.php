<?php

namespace App\Http\Controllers;

use App\Faq;
use ErrorException;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;

class FaqsController extends ApiAuthController
{
    /**
     * @return mixed
     */
    public function all()
    {
        $faqs = Faq::where('account_id', $this->account->id)
            ->get();

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $faqs);
    }

    public function one(int $id)
    {
        $faq = Faq::findOrFail($id);

        return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $faq);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function upsert(Request $request)
    {

        try {

            $rules = [
                'faq_question' => 'required|max:255',
                'faq_answer' => 'required|max:1000'
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                $errorBag = $validator->errors()->getMessageBag()->all();
                throw new InvalidArgumentException(implode(' ', $errorBag));
            }

            if (!empty($request->id)) {
                $faq = Faq::findOrFail($request->id);
            } else {
                // edit mode
                $faq = new Faq;
            }

            $faq->account_id = $this->account->id;
            $faq->user_id = $this->user->id;
            $faq->faq_question = $request->faq_question;
            $faq->faq_answer = $request->faq_answer;

            if (!$faq->save()) {
                throw new ErrorException(sprintf("An error occurred while saving entry"));
            }

            return $this->jsonApiResponse(self::STATUS_SUCCESS, 'Success', $faq);

        } catch (Exception $exception) {
            return $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     */
    public function delete(Request $request)
    {

        try {

            if (empty($request->id)) {
                throw new ErrorException("Id is required");
            }

            /** @var Faq $faq */
            $faq = Faq::find($request->id);

            if (!$faq) {
                throw new InvalidArgumentException("Faq not found");
            }

            if ($faq->account_id !== $this->account->id) {
                throw new InvalidArgumentException("Forbidden.");
            }

            if (!$faq->delete()) {
                throw new ErrorException("There was a problem while deleting FAQ");
            }

            $this->jsonApiResponse(self::STATUS_SUCCESS, 'Successfully deleted FAQ');

        } catch (Exception $exception) {
            $this->jsonApiResponse(self::STATUS_ERROR, $exception->getMessage());
        }

    }
}
