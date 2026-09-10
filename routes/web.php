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
    $animals = \App\Models\Animal::with([
        'healthChecks' => function ($query) {
            $query->orderBy('checked_at');
        }
    ])->get();

    return Inertia::render('Dashboard', [
        'animals' => $animals,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('animals', \App\Http\Controllers\AnimalController::class);
    Route::resource('iot-devices', \App\Http\Controllers\IotDeviceController::class);
});

require __DIR__ . '/auth.php';
