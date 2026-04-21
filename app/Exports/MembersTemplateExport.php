<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class MembersTemplateExport implements FromArray
{
    public function array(): array
    {
        return [
            ['first_name', 'last_name', 'email', 'phone', 'landline', 'address', 'label']
        ];
    }
}
