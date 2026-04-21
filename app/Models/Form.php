<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    protected $fillable = [
        'title',
        'description',
        'valid_until',
        'notify_leader_id',
        'creator_id',
        'short_url_slug',
        'is_deleted',
    ];

    protected function casts(): array
    {
        return [
            'valid_until' => 'datetime',
            'is_deleted' => 'boolean',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function notifyLeader()
    {
        return $this->belongsTo(User::class, 'notify_leader_id');
    }

    public function fields()
    {
        return $this->hasMany(FormField::class);
    }

    public function responses()
    {
        return $this->hasMany(FormResponse::class);
    }
}
