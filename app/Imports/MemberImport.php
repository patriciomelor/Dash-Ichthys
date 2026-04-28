<?php

namespace App\Imports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MemberImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Member([
            'first_name' => $row['nombres'] ?? $row['nombre'] ?? null,
            'last_name'  => $row['apellidos'] ?? $row['apellido'] ?? null,
            'address'    => $row['direccion'] ?? null,
            'email'      => $row['correo'] ?? $row['email'] ?? null,
            'phone'      => $row['telefono'] ?? $row['celular'] ?? null,
            'landline'   => $row['fijo'] ?? $row['telefono_fijo'] ?? null,
            'label'      => $this->mapLabel($row['etiqueta'] ?? $row['tipo'] ?? ''),
            'is_active'  => true,
        ]);
    }

    private function mapLabel(string $label): string
    {
        $label = strtolower(trim($label));
        if (str_contains($label, 'miembro')) return 'miembro';
        if (str_contains($label, 'asistente')) return 'asistente_regular';
        return 'visita';
    }
}
