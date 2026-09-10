import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, CalendarDays, PencilLine, Rabbit, ShieldCheck } from 'lucide-react';

interface HealthCheck {
    id: number;
    weight: number;
    temperature: number | null;
    notes: string | null;
    source: string;
    is_alert: boolean;
    checked_at: string;
}

interface Animal {
    id: number;
    code: string;
    name: string | null;
    species: string;
    birth_date: string | null;
    owner: string | null;
}

export default function Show({ animal, healthChecks }: { animal: Animal; healthChecks: HealthCheck[] }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Detail ternak</p>
                        <h2 className="text-2xl font-bold text-slate-900">{animal.code}</h2>
                    </div>
                    <Link
                        href={route('animals.edit', animal.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
                    >
                        <PencilLine className="h-4 w-4" />
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`Detail ${animal.code}`} />

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
                    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                                <Rabbit className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Hewan</p>
                                <h3 className="text-xl font-semibold text-slate-900">{animal.name ?? animal.code}</h3>
                            </div>
                        </div>

                        <dl className="space-y-4 text-sm">
                            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                                <dt className="text-slate-500">Kode</dt>
                                <dd className="font-medium text-slate-900">{animal.code}</dd>
                            </div>
                            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                                <dt className="text-slate-500">Nama</dt>
                                <dd className="font-medium text-slate-900">{animal.name ?? '-'}</dd>
                            </div>
                            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                                <dt className="text-slate-500">Jenis</dt>
                                <dd className="font-medium capitalize text-slate-900">{animal.species}</dd>
                            </div>
                            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                                <dt className="text-slate-500">Pemilik</dt>
                                <dd className="font-medium text-slate-900">{animal.owner ?? '-'}</dd>
                            </div>
                            <div className="flex items-start justify-between gap-3">
                                <dt className="text-slate-500">Status</dt>
                                <dd>
                                    {healthChecks.some((check) => check.is_alert) ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                                            <AlertTriangle className="h-3.5 w-3.5" /> Alert
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                            <ShieldCheck className="h-3.5 w-3.5" /> Normal
                                        </span>
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </aside>

                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <h3 className="text-lg font-semibold text-slate-900">Riwayat Penjaringan Kesehatan</h3>
                            <div className="flex items-center gap-2 text-slate-500">
                                <CalendarDays className="h-4 w-4" />
                                {healthChecks.length} catatan
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                                        <th className="px-5 py-3 font-medium">Tanggal</th>
                                        <th className="px-5 py-3 font-medium">BB (kg)</th>
                                        <th className="px-5 py-3 font-medium">Suhu (°C)</th>
                                        <th className="px-5 py-3 font-medium">Sumber</th>
                                        <th className="px-5 py-3 font-medium">Catatan</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {healthChecks.map((check) => (
                                        <tr key={check.id} className={`border-b border-slate-200 ${check.is_alert ? 'bg-amber-50/40' : 'bg-white'}`}>
                                            <td className="px-5 py-4 text-slate-700">{new Date(check.checked_at).toLocaleString('id-ID')}</td>
                                            <td className="px-5 py-4 text-slate-700">{check.weight}</td>
                                            <td className="px-5 py-4 text-slate-700">{check.temperature ?? '-'}</td>
                                            <td className="px-5 py-4 capitalize text-slate-700">{check.source}</td>
                                            <td className="px-5 py-4 text-slate-700">{check.notes ?? '-'}</td>
                                            <td className="px-5 py-4">
                                                {check.is_alert ? (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600">
                                                        <AlertTriangle className="h-3.5 w-3.5" /> Alert
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                                        <ShieldCheck className="h-3.5 w-3.5" /> Normal
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}

                                    {healthChecks.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-5 py-12 text-center text-slate-500">
                                                Belum ada data penjaringan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
