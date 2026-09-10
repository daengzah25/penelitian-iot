<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HealthCheck;
use Illuminate\Http\Request;

class IotDataController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric',
            'temperature' => 'nullable|numeric',
            'notes' => 'nullable|string',
        ]);

        $device = $request->iot_device;

        if (!$device->animal_id) {
            abort(422, 'Device ini belum terhubung ke hewan mana pun');
        }

        $weight = $validated['weight'];
        $isAlert = false;

        // Cek data aneh (sensor error)
        if ($weight <= 0 || $weight > 1500) {
            $isAlert = true;
        }

        // Bandingkan dengan cek terakhir
        $lastCheck = HealthCheck::where('animal_id', $device->animal_id)
            ->orderByDesc('checked_at')
            ->first();

        if ($lastCheck && $lastCheck->weight > 0) {
            $change = (($weight - $lastCheck->weight) / $lastCheck->weight) * 100;
            if ($change <= -10) {
                $isAlert = true;
            }
        }

        $healthCheck = HealthCheck::create([
            'animal_id' => $device->animal_id,
            'weight' => $weight,
            'temperature' => $validated['temperature'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'source' => 'iot',
            'is_alert' => $isAlert,
            'checked_at' => now(),
        ]);

        return response()->json(['message' => 'Data tersimpan', 'data' => $healthCheck], 201);
    }
}