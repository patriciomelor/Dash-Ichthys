<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
            'bg_color' => 'required|string|max:50',
            'text_color' => 'required|string|max:50',
        ]);

        $validated['name'] = strtolower(trim($validated['name']));

        Tag::create($validated);

        return redirect()->back()->with('success', 'Etiqueta creada correctamente.');
    }

    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $id,
            'bg_color' => 'required|string|max:50',
            'text_color' => 'required|string|max:50',
        ]);

        $validated['name'] = strtolower(trim($validated['name']));

        $tag->update($validated);

        return redirect()->back()->with('success', 'Etiqueta actualizada correctamente.');
    }

    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return redirect()->back()->with('success', 'Etiqueta eliminada correctamente.');
    }
}
