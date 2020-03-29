<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use Notifiable;

    const ROLE_ADMIN = "admin";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function generateToken()
    {
        $this->api_token = Str::random(60);
        $this->save();

        return $this->api_token;
    }

    public function getRole()
    {
        /**
         * todo: sean continue
         */
        return self::ROLE_ADMIN;
    }

    /**
     * Get redirect route  after logging in
     * @return string
     */
    public function getLoginRedirectRoute(): string
    {
        switch ($this->getRole()) {
            case self::ROLE_ADMIN:
                // todo: sean add other roles
            default:
                return admin_url('');
                break;
        }
    }

    /**
     * @return array|void
     */
    public function toArray()
    {
        parent::toArray();
        /**
         * Append other details for API
         */
        $data = parent::toArray();
        $data['login_redirect_route'] = $this->getLoginRedirectRoute();

        return $data;

    }
}
