<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SupportRequest extends Model
{
    const STATUS_PENDING = 'pending';
    const STATUS_MARKED_AS_READ = 'marked_as_read';

    /**
     * @param Account $account
     * @return string
     * @throws \Exception
     */
    public static function generateReferenceNumber(Account $account)
    {
        return strtoupper(sprintf(
            "%s-%s",
            $account->subdomain,
            substr(md5(time() . random_int(0, 100)), 0, 10)
        ));
    }
}
