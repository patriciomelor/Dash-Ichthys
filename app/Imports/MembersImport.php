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

        $is_deceased = isset($row['is_deceased']) && in_array(strtolower(trim($row['is_deceased'])), ['si', 'sí', 'yes', 'true', '1']);

        return new Member([
            'first_name' => $row['first_name'] ?? 'Sin Nombre',
            'last_name' => $row['last_name'] ?? '',
            'email' => $row['email'] ?? null,
            'phone' => $row['phone'] ?? null,
            'landline' => $row['landline'] ?? null,
            'address' => $row['address'] ?? null,
            'label' => $label,
            'is_active' => true,
            'birth_date' => $this->parseDate($row['birth_date'] ?? null),
            'conversion_date' => $this->parseDate($row['conversion_date'] ?? null),
            'baptism_date' => $this->parseDate($row['baptism_date'] ?? null),
            'marriage_date' => $this->parseDate($row['marriage_date'] ?? null),
            'class_connect_1_date' => $this->parseDate($row['class_connect_1_date'] ?? null),
            'class_grow_2_date' => $this->parseDate($row['class_grow_2_date'] ?? null),
            'class_equip_date' => $this->parseDate($row['class_equip_date'] ?? null),
            'membership_date' => $this->parseDate($row['membership_date'] ?? null),
            'membership_cessation_date' => $this->parseDate($row['membership_cessation_date'] ?? null),
            'reinstatement_date' => $this->parseDate($row['reinstatement_date'] ?? null),
            'is_deceased' => $is_deceased,
            'death_date' => $is_deceased ? $this->parseDate($row['death_date'] ?? null) : null,
        ]);
    }

    private function parseDate($value)
    {
        if (empty($value)) {
            return null;
        }

        if (is_numeric($value)) {
            try {
                return \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value)->format('Y-m-d');
            } catch (\Exception $e) {
                return null;
            }
        }

        try {
            return \Carbon\Carbon::parse($value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }
}
