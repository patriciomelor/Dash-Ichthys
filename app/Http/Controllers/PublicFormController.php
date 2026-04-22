<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PublicFormController extends Controller
{
    public function show($slug)
    {
        $form = Form::with('fields')->where('short_url_slug', $slug)->firstOrFail();

        // Check if form is deleted or expired
        if ($form->is_deleted || ($form->valid_until && now()->startOfDay()->gt(\Carbon\Carbon::parse($form->valid_until)->startOfDay()))) {
            return Inertia::render('Public/Forms/Closed', [
                'title' => $form->title
            ]);
        }

        return Inertia::render('Public/Forms/Show', [
            'form' => $form
        ]);
    }

    public function store(Request $request, $slug)
    {
        $form = Form::with('fields')->where('short_url_slug', $slug)->firstOrFail();

        if ($form->is_deleted || ($form->valid_until && now()->startOfDay()->gt(\Carbon\Carbon::parse($form->valid_until)->startOfDay()))) {
            return back()->with('error', 'El formulario ya no está activo.');
        }

        // Build dynamic validation rules
        $rules = [
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'responses' => 'required|array',
        ];

        foreach ($form->fields as $field) {
            $rule = $field->is_required ? 'required' : 'nullable';
            
            if ($field->type === 'number') {
                $rule .= '|numeric';
            } elseif ($field->type === 'date') {
                $rule .= '|date';
            } else {
                $rule .= '|string';
            }
            
            $rules["responses.{$field->id}"] = $rule;
        }

        $request->validate($rules);

        try {
            DB::beginTransaction();

            // Create response
            $response = $form->responses()->create([
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
            ]);

            // Save values
            $values = [];
            foreach ($form->fields as $field) {
                if (isset($request->input('responses')[$field->id])) {
                    $values[] = [
                        'form_response_id' => $response->id,
                        'form_field_id' => $field->id,
                        'value' => $request->input('responses')[$field->id],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            if (!empty($values)) {
                \App\Models\FormResponseValue::insert($values);
            }

            DB::commit();

            return redirect()->route('public.forms.success', $slug);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Ocurrió un error al guardar la respuesta.');
        }
    }

    public function success($slug)
    {
        $form = Form::where('short_url_slug', $slug)->firstOrFail();
        
        return Inertia::render('Public/Forms/Success', [
            'form' => $form
        ]);
    }
}
