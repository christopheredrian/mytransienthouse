<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use Notifiable;

    const ROLE_ADMIN = "admin";
    const ROLE_BUSINESS_OWNER = "business_owner";
    const ROLE_CUSTOMER = "customer";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role',
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

    public function invalidateToken(): void
    {
        $this->api_token = null;
        $this->save();
    }

    public function generateToken()
    {
        $this->api_token = Str::random(60);
        $this->save();

        return $this->api_token;
    }

    public function getRole()
    {
        return $this->role;
    }

    /**
     * Get redirect route  after logging in
     * @return string
     */
    public function getLoginRedirectRoute(): string
    {

        $role = $this->getRole();

        if ($role === self::ROLE_ADMIN) {
            return '/';
        } else if ($role === self::ROLE_BUSINESS_OWNER) {
            return '/bo';
        } else {
            return '/';
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

    /**
     * @param string $apiToken
     * @return static
     * @throws \Exception
     */
    public static function findByApiTokenOrFail(string $apiToken): self
    {
        return self::where('api_token', $apiToken)
            ->firstOrFail();
    }

    /**
     * Returns associated account
     * @return Account
     */
    public function account(): Account
    {
        return Account::findOrFail($this->account_id);
    }
}
