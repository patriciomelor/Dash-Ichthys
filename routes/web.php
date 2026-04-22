<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/f/{slug}', [\App\Http\Controllers\PublicFormController::class, 'show'])->name('public.forms.show');
Route::post('/f/{slug}', [\App\Http\Controllers\PublicFormController::class, 'store'])->name('public.forms.store');
Route::get('/f/{slug}/success', [\App\Http\Controllers\PublicFormController::class, 'success'])->name('public.forms.success');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/members', [\App\Http\Controllers\MemberController::class, 'index'])->name('members.index');
    Route::post('/members/import', [\App\Http\Controllers\MemberController::class, 'import'])->name('members.import');
    Route::get('/members/export-template', [\App\Http\Controllers\MemberController::class, 'exportTemplate'])->name('members.export-template');
    Route::get('/members/{id}', [\App\Http\Controllers\MemberController::class, 'show'])->name('members.show');
    Route::post('/members/{id}/comments', [\App\Http\Controllers\MemberController::class, 'addComment'])->name('members.comments.add');

    Route::get('/forms', [\App\Http\Controllers\FormController::class, 'index'])->name('forms.index');
    Route::get('/forms/create', [\App\Http\Controllers\FormController::class, 'create'])->name('forms.create');
    Route::post('/forms', [\App\Http\Controllers\FormController::class, 'store'])->name('forms.store');
    Route::get('/forms/{id}', [\App\Http\Controllers\FormController::class, 'show'])->name('forms.show');
    Route::get('/forms/{id}/edit', [\App\Http\Controllers\FormController::class, 'edit'])->name('forms.edit');

    Route::get('/ministries', [\App\Http\Controllers\MinistryController::class, 'index'])->name('ministries.index');
    Route::post('/ministries', [\App\Http\Controllers\MinistryController::class, 'store'])->name('ministries.store');

    Route::get('/settings', [\App\Http\Controllers\TenantSettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\TenantSettingController::class, 'update'])->name('settings.update');

    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'store'])->name('users.store');
});

require __DIR__.'/auth.php';
