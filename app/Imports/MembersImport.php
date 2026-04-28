<?php

namespace App\Imports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MembersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Parse labels
        $rawLabels = $row['etiquetas_separadas_por_coma'] ?? '';
        if (empty(trim($rawLabels))) {
            $labels = ['miembro'];
        } else {
            $labels = array_unique(array_filter(array_map(function($label) {
                return strtolower(trim($label));
            }, explode(',', $rawLabels))));
        }

        // Auto-create tags if they don't exist
        foreach ($labels as $labelName) {
            \App\Models\Tag::firstOrCreate(
                ['name' => $labelName],
                ['bg_color' => '#f3f4f6', 'text_color' => '#1f2937']
            );
        }

        $is_deceased = isset($row['fallecido_sino']) && in_array(strtolower(trim($row['fallecido_sino'])), ['si', 'sí', 'yes', 'true', '1']);

        return new Member([
            'first_name' => $row['nombres'] ?? 'Sin Nombre',
            'last_name' => $row['apellidos'] ?? '',
            'email' => $row['correo'] ?? null,
            'phone' => $row['celular'] ?? null,
            'landline' => $row['telefono_fijo'] ?? null,
            'address' => $row['direccion'] ?? null,
            'labels' => $labels,
            'is_active' => true,
            'birth_date' => $this->parseDate($row['fecha_nacimiento'] ?? null),
            'conversion_date' => $this->parseDate($row['fecha_conversion'] ?? null),
            'baptism_date' => $this->parseDate($row['fecha_bautismo'] ?? null),
            'marriage_date' => $this->parseDate($row['fecha_matrimonio'] ?? null),
            'class_connect_1_date' => $this->parseDate($row['clase_conectar_1'] ?? null),
            'class_grow_2_date' => $this->parseDate($row['clase_crecer_2'] ?? null),
            'class_equip_date' => $this->parseDate($row['clase_capacitar'] ?? null),
            'membership_date' => $this->parseDate($row['fecha_membresia'] ?? null),
            'membership_cessation_date' => $this->parseDate($row['fecha_cese_membresia'] ?? null),
            'reinstatement_date' => $this->parseDate($row['fecha_reinsercion'] ?? null),
            'is_deceased' => $is_deceased,
            'death_date' => $is_deceased ? $this->parseDate($row['fecha_defuncion'] ?? null) : null,
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
