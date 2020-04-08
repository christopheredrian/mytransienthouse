<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account // extends Model
{
    public function __construct(string $subdomain)
    {
        $this->subdomain = $subdomain;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subdomain', 'business_name',
    ];
}
