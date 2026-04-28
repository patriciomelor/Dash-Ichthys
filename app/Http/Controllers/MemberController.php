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
        $tags = \App\Models\Tag::orderBy('name')->get();
        
        return Inertia::render('Members/Index', [
            'members' => $members,
            'tags' => $tags
        ]);
    }

    public function show($id)
    {
        $member = Member::with(['comments.user'])->findOrFail($id);
        $tags = \App\Models\Tag::orderBy('name')->get();

        return Inertia::render('Members/Show', [
            'member' => $member,
            'tags' => $tags
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

    public function update(Request $request, $id)
    {
        $member = Member::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'landline' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'labels' => 'required',
            'is_active' => 'boolean',
            'conversion_date' => 'nullable|date',
            'baptism_date' => 'nullable|date',
            'class_connect_1_date' => 'nullable|date',
            'class_grow_2_date' => 'nullable|date',
            'class_equip_date' => 'nullable|date',
            'marriage_date' => 'nullable|date',
            'membership_date' => 'nullable|date',
            'birth_date' => 'nullable|date',
            'is_deceased' => 'boolean',
            'death_date' => 'nullable|date',
            'membership_cessation_date' => 'nullable|date',
            'reinstatement_date' => 'nullable|date',
        ]);

        // If labels comes as array, filter it. If string, explode it.
        $rawLabels = $validated['labels'];
        if (is_array($rawLabels)) {
            $labelsArray = array_filter(array_map(function($label) {
                return strtolower(trim($label));
            }, $rawLabels));
        } else {
            $labelsArray = array_filter(array_map(function($label) {
                return strtolower(trim($label));
            }, explode(',', $rawLabels)));
        }

        if (empty($labelsArray)) {
            $labelsArray = ['miembro'];
        }

        $validated['labels'] = $labelsArray;

        $member->update($validated);

        return redirect()->back()->with('success', 'Perfil actualizado correctamente.');
    }

    public function exportExcel()
    {
        return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\MembersExport, 'miembros_' . date('Y-m-d') . '.xlsx');
    }

    public function exportPdf()
    {
        $members = Member::orderBy('first_name')->get();
        
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('exports.members_pdf', compact('members'));
        
        return $pdf->download('miembros_' . date('Y-m-d') . '.pdf');
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
