<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'email',
        'phone',
        'landline',
        'label',
        'is_active',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
