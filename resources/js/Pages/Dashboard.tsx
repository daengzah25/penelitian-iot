import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    AlertTriangle,
    Activity,
    ArrowUpRight,
    PawPrint,
    ShieldCheck,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface HealthCheck {
    id: number;
    weight: number;
    temperature: number | null;
    checked_at: string;
    source: string;
    is_alert: boolean;
}

interface Animal {
    id: number;
    code: string;
    name: string | null;
    species: string;
    health_checks: HealthCheck[];
}

export default function Dashboard({ animals }: { animals: Animal[] }) {
    const [selected, setSelected] = useState<Animal | null>(animals[0] ?? null);

    const chartData = selected?.health_checks.map((h) => ({
        tanggal: new Date(h.checked_at).toLocaleDateString('id-ID'),
        berat: h.weight,
    })) ?? [];

    const totalAlert = animals.reduce(
        (count, animal) => count + animal.health_checks.filter((check) => check.is_alert).length,
        0,
    );

    const healthyAnimals = animals.filter(
        (animal) => !animal.health_checks.some((check) => check.is_alert),
    ).length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Overview</p>
                        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total hewan</p>
                                <h3 className="mt-2 text-3xl font-bold text-slate-900">{animals.length}</h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                                <PawPrint className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Status sehat</p>
                                <h3 className="mt-2 text-3xl font-bold text-slate-900">{healthyAnimals}</h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Alert aktif</p>
                                <h3 className="mt-2 text-3xl font-bold text-slate-900">{totalAlert}</h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Daftar hewan</h3>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                                <Activity className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            {animals.map((animal) => {
                                const animalHasAlert = animal.health_checks.some((check) => check.is_alert);

                                return (
                                    <button
                                        key={animal.id}
                                        type="button"
                                        onClick={() => setSelected(animal)}
                                        className={
                                            'flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition ' +
                                            (selected?.id === animal.id
                                                ? 'border-sky-200 bg-sky-50 text-sky-800 shadow-sm'
                                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-200 hover:bg-sky-50/60')
                                        }
                                    >
                                        <div>
                                            <div className="font-semibold">{animal.code}</div>
                                            <div className="text-xs text-slate-500 capitalize">{animal.species}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {animalHasAlert && (
                                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-[10px] font-medium text-amber-700">
                                                    Alert
                                                </span>
                                            )}
                                            <ArrowUpRight className="h-4 w-4" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Grafik berat badan</p>
                                <h3 className="text-xl font-semibold text-slate-900">
                                    {selected ? selected.code : 'Pilih hewan'}
                                </h3>
                            </div>
                            {selected?.health_checks.some((h) => h.is_alert) && (
                                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-700">
                                    <AlertTriangle className="h-4 w-4" />
                                    Ada data yang perlu diperiksa
                                </div>
                            )}
                        </div>

                        {chartData.length > 0 ? (
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#dfeaf5" />
                                        <XAxis dataKey="tanggal" tickLine={false} axisLine={false} stroke="#64748b" />
                                        <YAxis tickLine={false} axisLine={false} stroke="#64748b" />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '14px',
                                                border: '1px solid #dbeafe',
                                                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.1)',
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="berat"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#2563eb' }}
                                            activeDot={{ r: 6, fill: '#1d4ed8' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                                Belum ada data untuk hewan ini.
                            </div>
                        )}

                        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                            <TrendingUp className="h-4 w-4 text-sky-600" />
                            {selected ? `Perkembangan bobot ${selected.code}` : 'Pilih hewan untuk melihat grafik'}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
