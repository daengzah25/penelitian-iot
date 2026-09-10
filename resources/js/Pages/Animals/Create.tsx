import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, PawPrint, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

const fieldClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-800 shadow-sm transition focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        species: 'sapi',
        birth_date: '',
        owner: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('animals.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Master data</p>
                        <h2 className="text-2xl font-bold text-slate-900">Tambah Hewan</h2>
                    </div>
                    <Link
                        href={route('animals.index')}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Hewan" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                            <PawPrint className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">Tambah data ternak</h3>
                            <p className="text-sm text-slate-500">Isi detail utama hewan baru.</p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Kode Hewan</label>
                            <input
                                type="text"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                className={fieldClass}
                            />
                            {errors.code && <p className="mt-2 text-sm text-red-600">{errors.code}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Nama (opsional)</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={fieldClass}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Jenis Hewan</label>
                            <select
                                value={data.species}
                                onChange={(e) => setData('species', e.target.value)}
                                className={fieldClass}
                            >
                                <option value="sapi">Sapi</option>
                                <option value="kambing">Kambing</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Tanggal Lahir</label>
                            <input
                                type="date"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className={fieldClass}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">Pemilik / Kelompok</label>
                            <input
                                type="text"
                                value={data.owner}
                                onChange={(e) => setData('owner', e.target.value)}
                                className={fieldClass}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
                        <Link
                            href={route('animals.index')}
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