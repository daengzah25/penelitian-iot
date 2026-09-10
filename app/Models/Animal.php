<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{

    protected $fillable = ['code', 'name', 'species', 'birth_date', 'owner'];
    public function healthChecks()
    {
        return $this->hasMany(HealthCheck::class);
    }

    public function iotDevice()
    {
        return $this->hasOne(IotDevice::class);
    }
}
