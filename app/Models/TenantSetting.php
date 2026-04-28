<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantSetting extends Model
{
    protected $fillable = [
        'church_name',
        'logo_path',
        'primary_color',
        'secondary_color',
        'is_dark_mode',
        'address',
        'phone',
    ];

    protected function casts(): array
    {
        return [
            'is_dark_mode' => 'boolean',
        ];
    }
}
