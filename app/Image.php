<?php

namespace App;


use Illuminate\Database\Eloquent\SoftDeletes;

class Image
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'url', 'us_active',
    ];
}