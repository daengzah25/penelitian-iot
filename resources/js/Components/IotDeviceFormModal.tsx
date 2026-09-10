import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { Cpu, Save, X } from 'lucide-react';
import { FormEventHandler } from 'react';

const fieldClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 shadow-sm transition focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100';

interface AnimalOption {
    id: number;
    code: string;
    name: string | null;
}

interface DeviceFormData {
    id?: number;
    device_code: string;
    type: string | null;
    animal_id: number | null;
    api_token?: string;
}

export default function IotDeviceFormModal({
    show,
    device,
    animals,
    onClose,
}: {
    show: boolean;
    device?: DeviceFormData;
    animals: AnimalOption[];
    onClose: () => void;
}) {
    const isEditing = Boolean(device);
    const { data, setData, post, put, processing, errors } = useForm({
        device_code: device?.device_code ?? '',
        type: device?.type ?? '',
        animal_id: device?.animal_id ? String(device.animal_id) : '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        const options = { onSuccess: onClose };
        if (isEditing && device?.id) {
            put(route('iot-devices.update', device.id), options);
        } else {
            post(route('iot-devices.store'), options);
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="xl">
            <form onSubmit={submit}>
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                            <Cpu className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">{isEditing ? 'Edit Alat IoT' : 'Tambah Alat IoT'}</h3>
                            <p className="text-sm text-slate-500">Atur perangkat dan hubungkan ke hewan.</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid gap-5 px-6 py-6">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Kode Alat</label>
                        <input type="text" value={data.device_code} onChange={(event) => setData('device_code', event.target.value)} className={fieldClass} autoFocus />
                        {errors.device_code && <p className="mt-2 text-sm text-red-600">{errors.device_code}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Tipe Alat (opsional)</label>
                        <input type="text" placeholder="misal: sensor suhu" value={data.type} onChange={(event) => setData('type', event.target.value)} className={fieldClass} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Pasang ke Hewan (opsional)</label>
                        <select value={data.animal_id} onChange={(event) => setData('animal_id', event.target.value)} className={fieldClass}>
                            <option value="">-- Belum dipasang --</option>
                            {animals.map((animal) => (
                                <option key={animal.id} value={animal.id}>{animal.code} {animal.name ? `(${animal.name})` : ''}</option>
                            ))}
                        </select>
                    </div>
                    {device?.api_token && (
                        <div className="rounded-2xl border border-sky-100 bg-sky-50 p-3 text-sm text-slate-700">
                            <span className="font-medium text-slate-500">Token:</span>{' '}
                            <span className="font-mono text-slate-800">{device.api_token}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300">Batal</button>
                    <button type="submit" disabled={processing} className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">
                        <Save className="h-4 w-4" />
                        {processing ? 'Menyimpan...' : isEditing ? 'Update' : 'Simpan'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}