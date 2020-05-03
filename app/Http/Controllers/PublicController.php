<?php

namespace App\Http\Controllers;

use App\Faq;
use App\Photo;
use App\PhotoAlbum;
use App\Utilities\PhotoAlbumUtilities;
use App\SupportRequest;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use InvalidArgumentException;

class PublicController extends ApplicationController
{
    public function newIndex()
    {
        return view('public');
    }
}
