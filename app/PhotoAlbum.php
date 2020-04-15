<?php

namespace App;


use Illuminate\Database\Eloquent\SoftDeletes;

class PhotoAlbum
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description'
    ];

    public function getPhotos()
    {
        return Photo::where($this->id)->get();
    }
}