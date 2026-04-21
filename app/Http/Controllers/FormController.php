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
}
