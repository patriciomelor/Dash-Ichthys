<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Member;
use App\Imports\MemberImport;
use Maatwebsite\Excel\Facades\Excel;
use OpenApi\Attributes as OA;

class MemberController extends Controller
{
    #[OA\Get(
        path: "/api/members",
        summary: "Get all members",
        tags: ["Members"],
        responses: [
            new OA\Response(response: 200, description: "Successful operation")
        ]
    )]
    public function index()
    {
        return response()->json(Member::all());
    }

    #[OA\Post(
        path: "/api/members/import",
        summary: "Import members from Excel",
        tags: ["Members"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    properties: [
                        new OA\Property(property: "file", type: "string", format: "binary", description: "Excel file to import")
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Import successful"),
            new OA\Response(response: 400, description: "Invalid file")
        ]
    )]
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:10240',
        ]);

        try {
            Excel::import(new MemberImport, $request->file('file'));
            return response()->json(['message' => 'Importación de miembros exitosa.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al importar: ' . $e->getMessage()], 400);
        }
    }
}
