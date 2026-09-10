import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnimalFormModal from '@/Components/AnimalFormModal';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import Modal from '@/Components/Modal';
import { Head, router } from '@inertiajs/react';
import { AlertTriangle, CalendarDays, Eye, PencilLine, Plus, ShieldCheck, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Animal {
    id: number;
    code: string;
    name: string | null;
    species: string;
    birth_date: string | null;
    owner: string | null;
    health_checks: HealthCheck[];
}

interface HealthCheck {
    id: number;
    weight: number;
    temperature: number | null;
    checked_at: string;
    is_alert: boolean;
}

export default function Index({ animals }: { animals: Animal[] }) {
    const [formMode, setFormMode] = useState<'create' | 'edit' | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | undefined>();
    const [viewAnimal, setViewAnimal] = useState<Animal | null>(null);
    const [deleteAnimal, setDeleteAnimal] = useState<Animal | null>(null);
    const [deleting, setDeleting] = useState(false);

    const openCreate = () => {
        setSelectedAnimal(undefined);
        setFormMode('create');
    };

    const openEdit = (animal: Animal) => {
        setSelectedAnimal(animal);
        setFormMode('edit');
    };

    const handleDelete = (id: number) => {
        setDeleting(true);
        router.delete(route('animals.destroy', id), {
            onFinish: () => setDeleting(false),
            onSuccess: () => setDeleteAnimal(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Master data</p>
                        <h2 className="text-2xl font-bold text-slate-900">Data Hewan</h2>
                    </div>
                    <button
                        onClick={openCreate}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Hewan
                    </button>
                </div>
            }
        >
            <Head title="Data Hewan" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                        <h3 className="text-lg font-semibold text-slate-900">Daftar Hewan</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                                    <th className="px-5 py-3 font-medium">Kode</th>
                                    <th className="px-5 py-3 font-medium">Nama</th>
                                    <th className="px-5 py-3 font-medium">Jenis</th>
                                    <th className="px-5 py-3 font-medium">Pemilik</th>
                                    <th className="px-5 py-3 text-right font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {animals.map((animal) => (
                                    <tr key={animal.id} className="border-b border-slate-200 transition hover:bg-sky-50/40">
                                        <td className="px-5 py-4 align-middle">
                                            <button
                                                type="button"
                                                onClick={() => setViewAnimal(animal)}
                                                className="inline-flex items-center gap-2 font-semibold text-sky-700 transition hover:text-sky-800"
                                            >
                                                {animal.code}
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                        <td className="px-5 py-4 align-middle text-slate-700">{animal.name ?? '-'}</td>
                                        <td className="px-5 py-4 align-middle">
                                            <span className="inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium capitalize text-sky-700">
                                                {animal.species}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 align-middle text-slate-700">{animal.owner ?? '-'}</td>
                                        <td className="px-5 py-4 align-middle">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEdit(animal)}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                                                >
                                                    <PencilLine className="h-3.5 w-3.5" />
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteAnimal(animal)}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {animals.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                                            Belum ada data hewan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AnimalFormModal
                key={`${formMode}-${selectedAnimal?.id ?? 'new'}`}
                show={formMode !== null}
                animal={formMode === 'edit' ? selectedAnimal : undefined}
                onClose={() => setFormMode(null)}
            />

            <ConfirmDeleteModal
                show={Boolean(deleteAnimal)}
                title="Hapus data hewan?"
                description={deleteAnimal ? `Data ${deleteAnimal.code} akan dihapus permanen dan tidak dapat dipulihkan.` : ''}
                processing={deleting}
                onClose={() => setDeleteAnimal(null)}
                onConfirm={() => deleteAnimal && handleDelete(deleteAnimal.id)}
            />

            <Modal show={Boolean(viewAnimal)} onClose={() => setViewAnimal(null)} maxWidth="2xl">
                {viewAnimal && (
                    <div>
                        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Detail hewan</p>
                                <h3 className="mt-1 text-2xl font-bold text-slate-900">{viewAnimal.code}</h3>
                            </div>
                            <button type="button" onClick={() => setViewAnimal(null)} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="grid gap-6 p-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                            <dl className="space-y-4 text-sm">
                                <div className="flex justify-between gap-4 border-b border-slate-200 pb-3 lg:block"><dt className="text-slate-500">Nama</dt><dd className="font-medium text-slate-900">{viewAnimal.name ?? '-'}</dd></div>
                                <div className="flex justify-between gap-4 border-b border-slate-200 pb-3 lg:block"><dt className="text-slate-500">Jenis</dt><dd className="font-medium capitalize text-slate-900">{viewAnimal.species}</dd></div>
                                <div className="flex justify-between gap-4 border-b border-slate-200 pb-3 lg:block"><dt className="text-slate-500">Tanggal lahir</dt><dd className="font-medium text-slate-900">{viewAnimal.birth_date ?? '-'}</dd></div>
                                <div className="flex justify-between gap-4 lg:block"><dt className="text-slate-500">Pemilik / Kelompok</dt><dd className="font-medium text-slate-900">{viewAnimal.owner ?? '-'}</dd></div>
                            </dl>

                            <section className="overflow-hidden rounded-2xl border border-slate-200">
                                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
                                    <h4 className="font-semibold text-slate-900">Riwayat Penjaringan</h4>
                                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-500"><CalendarDays className="h-4 w-4" /> {viewAnimal.health_checks.length} catatan</span>
                                </div>
                                <div className="max-h-64 overflow-auto">
                                    <table className="min-w-full text-left text-sm">
                                        <thead className="sticky top-0 bg-white text-slate-500">
                                            <tr className="border-b border-slate-200"><th className="px-4 py-3 font-medium">Tanggal</th><th className="px-4 py-3 font-medium">BB</th><th className="px-4 py-3 font-medium">Suhu</th><th className="px-4 py-3 font-medium">Status</th></tr>
                                        </thead>
                                        <tbody>
                                            {viewAnimal.health_checks.map((check) => (
                                                <tr key={check.id} className="border-b border-slate-100 last:border-0">
                                                    <td className="px-4 py-3 text-slate-700">{new Date(check.checked_at).toLocaleString('id-ID')}</td>
                                                    <td className="px-4 py-3 text-slate-700">{check.weight} kg</td>
                                                    <td className="px-4 py-3 text-slate-700">{check.temperature ?? '-'} °C</td>
                                                    <td className="px-4 py-3">{check.is_alert ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700"><AlertTriangle className="h-3 w-3" /> Alert</span> : <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700"><ShieldCheck className="h-3 w-3" /> Normal</span>}</td>
                                                </tr>
                                            ))}
                                            {viewAnimal.health_checks.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">Belum ada data penjaringan.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>

                        <div className="flex justify-end border-t border-slate-200 px-6 py-5">
                            <button type="button" onClick={() => { setViewAnimal(null); openEdit(viewAnimal); }} className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">
                                <PencilLine className="h-4 w-4" /> Edit data
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
