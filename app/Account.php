<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Account extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subdomain', 'business_name',
    ];

    /**
     * @param string $subdomain
     * @throws ModelNotFoundException
     * @return self
     */
    public static function findOrThrowBySubdomain(string $subdomain)
    {
        return Account::where('subdomain', $subdomain)
            ->firstOrFail();

    }
}
