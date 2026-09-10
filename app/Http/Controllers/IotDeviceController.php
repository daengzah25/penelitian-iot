<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\IotDevice;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class IotDeviceController extends Controller
{
    public function index()
    {
        return Inertia::render('IotDevices/Index', [
            'devices' => IotDevice::with('animal')->latest()->get(),
            'animals' => Animal::select('id', 'code', 'name')->orderBy('code')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('IotDevices/Create', [
            'animals' => Animal::select('id', 'code', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'device_code' => 'required|string|unique:iot_devices,device_code',
            'type' => 'nullable|string',
            'animal_id' => 'nullable|exists:animals,id',
        ]);

        $validated['api_token'] = Str::random(40);

        IotDevice::create($validated);

        return redirect()->route('iot-devices.index')->with('success', 'Alat berhasil ditambahkan');
    }

    public function edit(IotDevice $iotDevice)
    {
        return Inertia::render('IotDevices/Edit', [
            'device' => $iotDevice,
            'animals' => Animal::select('id', 'code', 'name')->get(),
        ]);
    }

    public function update(Request $request, IotDevice $iotDevice)
    {
        $validated = $request->validate([
            'device_code' => 'required|string|unique:iot_devices,device_code,' . $iotDevice->id,
            'type' => 'nullable|string',
            'animal_id' => 'nullable|exists:animals,id',
        ]);

        $iotDevice->update($validated);

        return redirect()->route('iot-devices.index')->with('success', 'Alat berhasil diupdate');
    }

    public function destroy(IotDevice $iotDevice)
    {
        $iotDevice->delete();

        return redirect()->route('iot-devices.index')->with('success', 'Alat berhasil dihapus');
    }
}