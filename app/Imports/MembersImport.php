<?php

namespace App\Imports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MembersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Sanitize label
        $validLabels = ['miembro', 'asistente_regular', 'visita'];
        $label = isset($row['label']) ? strtolower(trim($row['label'])) : 'visita';
        
        if (!in_array($label, $validLabels)) {
            $label = 'visita';
        }

        return new Member([
            'first_name' => $row['first_name'] ?? 'Sin Nombre',
            'last_name' => $row['last_name'] ?? '',
            'email' => $row['email'] ?? null,
            'phone' => $row['phone'] ?? null,
            'landline' => $row['landline'] ?? null,
            'address' => $row['address'] ?? null,
            'label' => $label,
            'is_active' => true,
        ]);
    }
}
