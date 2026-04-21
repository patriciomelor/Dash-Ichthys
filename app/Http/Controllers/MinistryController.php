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

        Ministry::create($request->only('name', 'description', 'color'));

        return redirect()->route('ministries.index')->with('success', 'Ministerio creado exitosamente.');
    }
}
