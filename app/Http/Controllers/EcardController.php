<?php

namespace App\Http\Controllers;

use App\Ecard;
use App\EcardLog;

class EcardController extends Controller
{

    /**
     * @param string $handle
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function handle(string $handle = null)
    {

        if (empty($handle)) {
            abort(404);
        }

        $ecard = Ecard::where('handle', $handle)->first();

        if ($ecard) {
            EcardLog::log($ecard);
            return view('ecards/handle', [
                'ecard' => $ecard
            ]);
        }

        abort(404);

    }

}
