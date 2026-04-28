<?php

namespace App\Exports;

use App\Models\Member;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Carbon\Carbon;

class MembersExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    public function collection()
    {
        return Member::orderBy('first_name')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nombres',
            'Apellidos',
            'Correo',
            'Celular',
            'Teléfono Fijo',
            'Dirección',
            'Etiqueta',
            'Estado',
            'Fecha Nacimiento',
            'Fecha Conversión',
            'Fecha Bautismo',
            'Clase Conectar 1',
            'Clase Crecer 2',
            'Clase Capacitar',
            'Fecha Matrimonio',
            'Fecha Membresía',
            'Fecha Cese Membresía',
            'Fecha Reinserción',
            'Fallecido',
            'Fecha Defunción',
            'Registrado El'
        ];
    }

    public function map($member): array
    {
        $labelsString = implode(', ', array_map(function($label) {
            return ucfirst(str_replace('_', ' ', $label));
        }, $member->labels ?? ['miembro']));

        return [
            $member->id,
            $member->first_name,
            $member->last_name,
            $member->email,
            $member->phone,
            $member->landline,
            $member->address,
            $labelsString,
            $member->is_active ? 'Activo' : 'Inactivo',
            $member->birth_date ? $member->birth_date->format('d/m/Y') : '',
            $member->conversion_date ? $member->conversion_date->format('d/m/Y') : '',
            $member->baptism_date ? $member->baptism_date->format('d/m/Y') : '',
            $member->class_connect_1_date ? $member->class_connect_1_date->format('d/m/Y') : '',
            $member->class_grow_2_date ? $member->class_grow_2_date->format('d/m/Y') : '',
            $member->class_equip_date ? $member->class_equip_date->format('d/m/Y') : '',
            $member->marriage_date ? $member->marriage_date->format('d/m/Y') : '',
            $member->membership_date ? $member->membership_date->format('d/m/Y') : '',
            $member->membership_cessation_date ? $member->membership_cessation_date->format('d/m/Y') : '',
            $member->reinstatement_date ? $member->reinstatement_date->format('d/m/Y') : '',
            $member->is_deceased ? 'Sí' : 'No',
            $member->death_date ? $member->death_date->format('d/m/Y') : '',
            $member->created_at ? $member->created_at->format('d/m/Y H:i') : '',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']], 'fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'color' => ['rgb' => '4F46E5']]],
        ];
    }
}
