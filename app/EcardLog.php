<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EcardLog extends Model
{
    protected $table = 'ecard_logs';

    /**
     * @param Ecard $ecard
     * @return EcardLog
     */
    public static function log(Ecard $ecard){
        $log = new self;
        $log->ecard_id = $ecard->id;
        $log->ip = request()->ip();
        $log->save();
        return $log;
    }
}
