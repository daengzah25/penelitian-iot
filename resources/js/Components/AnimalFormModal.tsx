import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { PawPrint, Save, X } from 'lucide-react';
import { FormEventHandler } from 'react';

const fieldClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 shadow-sm transition focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100';

export interface AnimalFormData {
    id?: number;
    code: string;
    name: string | null;
    species: string;
    birth_date: string | null;
    owner: string | null;
}

export default function AnimalFormModal({
    show,
    animal,
    onClose,
}: {
    show: boolean;
    animal?: AnimalFormData;
    onClose: () => void;
}) {
    const isEditing = Boolean(animal);
    const { data, setData, post, put, processing, errors } = useForm({
        code: animal?.code ?? '',
        name: animal?.name ?? '',
        species: animal?.species ?? 'sapi',
        birth_date: animal?.birth_date ?? '',
        owner: animal?.owner ?? '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        const options = { onSuccess: onClose };
        if (isEditing && animal?.id) {
            put(route('animals.update', animal.id), options);
        } else {
            post(route('animals.store'), options);
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={submit}>
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                            <PawPrint className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">
                                {isEditing ? 'Edit Hewan' : 'Tambah Hewan'}
                            </h3>
                            <p className="text-sm text-slate-500">Lengkapi informasi ternak berikut.</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid max-h-[65vh] gap-5 overflow-y-auto px-6 py-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Kode Hewan</label>
                        <input type="text" value={data.code} onChange={(event) => setData('code', event.target.value)} className={fieldClass} autoFocus />
                        {errors.code && <p className="mt-2 text-sm text-red-600">{errors.code}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Nama (opsional)</label>
                        <input type="text" value={data.name} onChange={(event) => setData('name', event.target.value)} className={fieldClass} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Jenis Hewan</label>
                        <select value={data.species} onChange={(event) => setData('species', event.target.value)} className={fieldClass}>
                            <option value="sapi">Sapi</option>
                            <option value="kambing">Kambing</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Tanggal Lahir</label>
                        <input type="date" value={data.birth_date} onChange={(event) => setData('birth_date', event.target.value)} className={fieldClass} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Pemilik / Kelompok</label>
                        <input type="text" value={data.owner} onChange={(event) => setData('owner', event.target.value)} className={fieldClass} />
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
                        Batal
                    </button>
                    <button type="submit" disabled={processing} className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">
                        <Save className="h-4 w-4" />
                        {processing ? 'Menyimpan...' : isEditing ? 'Update' : 'Simpan'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}