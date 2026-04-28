<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class MembersTemplateExport implements FromArray
{
    public function array(): array
    {
        return [
            [
                'first_name', 'last_name', 'email', 'phone', 'landline', 'address', 'label', 
                'birth_date', 'conversion_date', 'baptism_date', 'marriage_date', 
                'class_connect_1_date', 'class_grow_2_date', 'class_equip_date', 
                'membership_date', 'membership_cessation_date', 'reinstatement_date', 
                'is_deceased', 'death_date'
            ]
        ];
    }
}
