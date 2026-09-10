<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimalController extends Controller
{
    public function index()
    {
        return Inertia::render('Animals/Index', [
            'animals' => Animal::with(['healthChecks' => function ($query) {
                $query->latest('checked_at');
            }])->latest()->get(),
        ]);
    }

    public function show(Animal $animal)
    {
        return Inertia::render('Animals/Show', [
            'animal' => $animal,
            'healthChecks' => $animal->healthChecks()->orderByDesc('checked_at')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Animals/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:animals,code',
            'name' => 'nullable|string',
            'species' => 'required|in:sapi,kambing',
            'birth_date' => 'nullable|date',
            'owner' => 'nullable|string',
        ]);

        Animal::create($validated);

        return redirect()->route('animals.index')->with('success', 'Hewan berhasil ditambahkan');
    }

    public function edit(Animal $animal)
    {
        return Inertia::render('Animals/Edit', [
            'animal' => $animal,
        ]);
    }

    public function update(Request $request, Animal $animal)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:animals,code,' . $animal->id,
            'name' => 'nullable|string',
            'species' => 'required|in:sapi,kambing',
            'birth_date' => 'nullable|date',
            'owner' => 'nullable|string',
        ]);

        $animal->update($validated);

        return redirect()->route('animals.index')->with('success', 'Data hewan berhasil diupdate');
    }

    public function destroy(Animal $animal)
    {
        $animal->delete();

        return redirect()->route('animals.index')->with('success', 'Hewan berhasil dihapus');
    }
}