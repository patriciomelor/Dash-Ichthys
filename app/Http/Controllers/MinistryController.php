<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ministry;

class MinistryController extends Controller
{
    public function index()
    {
        $ministries = Ministry::withCount('members')->get();
        return Inertia::render('Ministries/Index', [
            'ministries' => $ministries
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:50',
        ]);

        Ministry::create([
            'name' => $request->name,
            'description' => $request->description,
            'color_hex' => $request->color,
        ]);

        return redirect()->route('ministries.index')->with('success', 'Ministerio creado exitosamente.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:50',
        ]);

        $ministry = Ministry::findOrFail($id);
        $ministry->update([
            'name' => $request->name,
            'description' => $request->description,
            'color_hex' => $request->color,
        ]);

        return redirect()->route('ministries.index')->with('success', 'Ministerio actualizado exitosamente.');
    }

    public function destroy($id)
    {
        $ministry = Ministry::findOrFail($id);
        $ministry->delete();

        return redirect()->route('ministries.index')->with('success', 'Ministerio eliminado exitosamente.');
    }

    public function show($id)
    {
        $ministry = Ministry::with('members')->findOrFail($id);
        $allMembers = \App\Models\Member::where('is_active', true)->orderBy('first_name')->get();

        return Inertia::render('Ministries/Show', [
            'ministry' => $ministry,
            'availableMembers' => $allMembers
        ]);
    }

    public function addMember(Request $request, $id)
    {
        $request->validate([
            'member_id' => 'required|exists:members,id',
            'role' => 'nullable|string|max:50'
        ]);

        $ministry = Ministry::findOrFail($id);
        
        // Don't add if already exists
        if (!$ministry->members()->where('member_id', $request->member_id)->exists()) {
            $ministry->members()->attach($request->member_id, ['role' => $request->role ?? 'integrante']);
        }

        return back()->with('success', 'Miembro agregado al ministerio.');
    }

    public function removeMember($id, $member_id)
    {
        $ministry = Ministry::findOrFail($id);
        $ministry->members()->detach($member_id);

        return back()->with('success', 'Miembro removido del ministerio.');
    }
}
