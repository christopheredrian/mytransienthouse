<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ecard extends Model
{
    protected $fillable = [
        'salutation',
        'message',
        'velediction',
    ];
}
