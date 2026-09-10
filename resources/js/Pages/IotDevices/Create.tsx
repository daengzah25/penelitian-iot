import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Cpu, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const fieldClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 shadow-sm transition focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100';

interface Animal {
    id: number;
    code: string;
    name: string | null;
}

export default function Create({ animals }: { animals: Animal[] }) {
    const { data, setData, post, processing, errors } = useForm({
        device_code: '',
        type: '',
        animal_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('iot-devices.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Perangkat</p>
                        <h2 className="text-2xl font-bold text-slate-900">Tambah Alat IoT</h2>
                    </div>
                    <Link
                        href={route('iot-devices.index')}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Alat" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                            <Cpu className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">Tambah perangkat baru</h3>
                            <p className="text-sm text-slate-500">Atur kode alat dan hubungkan ke hewan yang sesuai.</p>
                        </div>
                    </div>

                    <div className="grid gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Kode Alat</label>
                            <input
                                type="text"
                                value={data.device_code}
                                onChange={(e) => setData('device_code', e.target.value)}
                                className={fieldClass}
                            />
                            {errors.device_code && <p className="mt-2 text-sm text-red-600">{errors.device_code}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Tipe Alat (opsional)</label>
                            <input
                                type="text"
                                placeholder="misal: timbangan, sensor suhu"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className={fieldClass}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Pasang ke Hewan (opsional)</label>
                            <select
                                value={data.animal_id}
                                onChange={(e) => setData('animal_id', e.target.value)}
                                className={fieldClass}
                            >
                                <option value="">-- Belum dipasang --</option>
                                {animals.map((animal) => (
                                    <option key={animal.id} value={animal.id}>
                                        {animal.code} {animal.name ? `(${animal.name})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                        <Link
                            href={route('iot-devices.index')}
                            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
