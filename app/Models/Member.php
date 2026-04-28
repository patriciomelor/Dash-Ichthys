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
        'conversion_date',
        'baptism_date',
        'class_connect_1_date',
        'class_grow_2_date',
        'class_equip_date',
        'marriage_date',
        'membership_date',
        'birth_date',
        'is_deceased',
        'death_date',
        'membership_cessation_date',
        'reinstatement_date',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_deceased' => 'boolean',
        'conversion_date' => 'date',
        'baptism_date' => 'date',
        'class_connect_1_date' => 'date',
        'class_grow_2_date' => 'date',
        'class_equip_date' => 'date',
        'marriage_date' => 'date',
        'membership_date' => 'date',
        'birth_date' => 'date',
        'death_date' => 'date',
        'membership_cessation_date' => 'date',
        'reinstatement_date' => 'date',
    ];

    public function comments()
    {
        return $this->hasMany(MemberComment::class)->orderBy('created_at', 'desc');
    }
}
