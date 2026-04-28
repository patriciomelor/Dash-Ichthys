<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Form;

class FormController extends Controller
{
    public function index()
    {
        $forms = Form::withCount('responses')->orderBy('created_at', 'desc')->paginate(10);
        
        return Inertia::render('Forms/Index', [
            'forms' => $forms
        ]);
    }

    public function create()
    {
        return Inertia::render('Forms/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'valid_until' => 'nullable|date',
            'fields' => 'required|array|min:1',
            'fields.*.name' => 'required|string|max:255',
            'fields.*.type' => 'required|string|in:text,textarea,number,date',
            'fields.*.is_required' => 'required|boolean',
        ]);

        $form = Form::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'valid_until' => $request->input('valid_until'),
            'creator_id' => $request->user()->id,
            'short_url_slug' => \Illuminate\Support\Str::random(10),
        ]);

        foreach ($request->input('fields') as $fieldData) {
            $form->fields()->create([
                'name' => $fieldData['name'],
                'type' => $fieldData['type'],
                'is_required' => $fieldData['is_required'],
            ]);
        }

        return redirect()->route('forms.index')->with('success', 'Formulario creado con éxito.');
    }

    public function show($id)
    {
        $form = Form::with('fields')->findOrFail($id);
        
        return Inertia::render('Forms/Show', [
            'form' => $form
        ]);
    }

    public function edit($id)
    {
        $form = Form::with('fields')->findOrFail($id);
        
        return Inertia::render('Forms/Edit', [
            'form' => $form
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'valid_until' => 'nullable|date',
        ]);

        $form = Form::findOrFail($id);
        
        $form->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'valid_until' => $request->input('valid_until'),
        ]);

        return redirect()->route('forms.show', $form->id)->with('success', 'Formulario actualizado con éxito.');
    }

    public function destroy($id)
    {
        $form = Form::findOrFail($id);
        
        // This will cascade delete fields and responses if DB is configured properly.
        // But to be safe, we can delete them explicitly or let the Model/DB handle it.
        // Assuming cascade on delete is set up in migrations.
        $form->delete();

        return redirect()->route('forms.index')->with('success', 'Formulario eliminado con éxito.');
    }
}
