<?php

namespace App;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Photo extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'path', 'owner_user_id', 'account_id', 'is_active',
    ];

    public function getUrlAttribute()
    {
        return Storage::disk('s3')->url($this->path);
    }
}