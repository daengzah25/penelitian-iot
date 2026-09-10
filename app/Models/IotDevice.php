<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IotDevice extends Model
{
    protected $fillable = ['device_code', 'type', 'animal_id', 'api_token', 'last_seen_at'];

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}
