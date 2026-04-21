<?php

namespace App\Imports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MembersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Member([
            'first_name' => $row['first_name'] ?? 'Sin Nombre',
            'last_name' => $row['last_name'] ?? '',
            'email' => $row['email'] ?? null,
            'phone' => $row['phone'] ?? null,
            'landline' => $row['landline'] ?? null,
            'address' => $row['address'] ?? null,
            'label' => $row['label'] ?? 'visita',
            'is_active' => true,
        ]);
    }
}
