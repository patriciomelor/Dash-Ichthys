<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Listado de Miembros</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            color: #333;
        }
        h2 {
            text-align: center;
            color: #4F46E5;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
        }
        th {
            background-color: #4F46E5;
            color: white;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 8px;
            color: #777;
        }
    </style>
</head>
<body>
    <h2>Directorio de Miembros - {{ date('d/m/Y') }}</h2>

    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Dirección</th>
                <th>Etiqueta</th>
                <th>Bautismo</th>
                <th>Membresía</th>
            </tr>
        </thead>
        <tbody>
            @foreach($members as $member)
            <tr>
                <td>{{ $member->first_name }} {{ $member->last_name }}</td>
                <td>
                    {{ $member->phone ?? $member->landline ?? '-' }}<br>
                    {{ $member->email ?? '' }}
                </td>
                <td>{{ $member->address ?? '-' }}</td>
                <td>{{ ucfirst(str_replace('_', ' ', $member->label)) }}</td>
                <td>{{ $member->baptism_date ? $member->baptism_date->format('d/m/Y') : '-' }}</td>
                <td>{{ $member->membership_date ? $member->membership_date->format('d/m/Y') : '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Generado el {{ date('d/m/Y H:i:s') }}
    </div>
</body>
</html>
