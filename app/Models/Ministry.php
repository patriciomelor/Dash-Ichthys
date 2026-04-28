<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ministry extends Model
{
    protected $fillable = [
        'name',
        'description',
        'color_hex',
        'icon',
    ];

    public function members()
    {
        return $this->belongsToMany(Member::class)
                    ->withPivot('role')
                    ->withTimestamps();
    }
}
