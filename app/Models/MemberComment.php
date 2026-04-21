<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberComment extends Model
{
    protected $fillable = ['member_id', 'user_id', 'comment'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
