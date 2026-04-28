<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class MembersTemplateExport implements FromArray
{
    public function array(): array
    {
        return [
            [
                'Nombres',
                'Apellidos',
                'Correo',
                'Celular',
                'Telefono Fijo',
                'Direccion',
                'Etiquetas (separadas por coma)',
                'Fecha Nacimiento',
                'Fecha Conversion',
                'Fecha Bautismo',
                'Fecha Matrimonio',
                'Clase Conectar',
                'Clase Crecer',
                'Clase Capacitar',
                'Fecha Membresia',
                'Fecha Cese Membresia',
                'Fecha Reinsercion',
                'Fallecido (Si/No)',
                'Fecha Defuncion'
            ]
        ];
    }
}
