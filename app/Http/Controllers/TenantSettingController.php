<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TenantSetting;

class TenantSettingController extends Controller
{
    public function index()
    {
        $settings = TenantSetting::first() ?? new TenantSetting();
        $tags = \App\Models\Tag::orderBy('name')->get();
        
        return Inertia::render('Settings/Index', [
            'settings' => $settings,
            'tags' => $tags
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'church_name' => 'required|string|max:255',
            'primary_color' => 'required|string|max:50',
            'secondary_color' => 'nullable|string|max:50',
            'is_dark_mode' => 'boolean',
        ]);

        $settings = TenantSetting::first();
        if (!$settings) {
            $settings = new TenantSetting();
        }

        $settings->fill($request->only('church_name', 'primary_color', 'secondary_color', 'is_dark_mode'));
        $settings->save();

        return redirect()->back()->with('success', 'Configuración actualizada exitosamente.');
    }
}
