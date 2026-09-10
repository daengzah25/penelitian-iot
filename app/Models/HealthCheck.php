<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthCheck extends Model
{
    protected $fillable = ['animal_id', 'weight', 'temperature', 'notes', 'source', 'checked_at', 'is_alert'];

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}
