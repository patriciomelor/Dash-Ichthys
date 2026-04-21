<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Member;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::orderBy('first_name')->paginate(15);
        
        return Inertia::render('Members/Index', [
            'members' => $members
        ]);
    }

    public function show($id)
    {
        $member = Member::with(['comments.user'])->findOrFail($id);

        return Inertia::render('Members/Show', [
            'member' => $member
        ]);
    }

    public function addComment(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string'
        ]);

        $member = Member::findOrFail($id);
        
        $member->comments()->create([
            'user_id' => $request->user()->id,
            'comment' => $request->comment,
        ]);

        return redirect()->back()->with('success', 'Comentario agregado.');
    }

    public function exportTemplate()
    {
        return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\MembersTemplateExport, 'plantilla_miembros.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv'
        ]);

        \Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\MembersImport, $request->file('file'));

        return redirect()->back()->with('success', 'Miembros importados correctamente.');
    }
}
