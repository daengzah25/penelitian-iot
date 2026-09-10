import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    BellRing,
    Cpu,
    PawPrint,
    ShieldCheck,
} from 'lucide-react';

export default function Welcome({ auth }: { auth?: { user?: { name?: string } } }) {
    const features = [
        {
            icon: Activity,
            title: 'Monitoring real-time',
            description: 'Pantau berat badan, suhu, dan kondisi ternak secara otomatis dari data IoT.',
        },
        {
            icon: BellRing,
            title: 'Deteksi alert',
            description: 'Identifikasi kondisi berisiko lebih cepat agar tindakan preventif dapat dilakukan segera.',
        },
        {
            icon: Cpu,
            title: 'Perangkat terkoneksi',
            description: 'Integrasi perangkat sensor dan alat IoT untuk data ternak yang konsisten dan akurat.',
        },
    ];

    return (
        <>
            <Head title="Pternak | Monitoring Ternak" />

            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 text-slate-800">
                <header className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between rounded-full border border-sky-100 bg-white/80 px-4 py-3 shadow-sm shadow-sky-100 backdrop-blur">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm shadow-sky-200">
                                <PawPrint className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold tracking-[0.22em] text-sky-700 uppercase">
                                    Pternak
                                </div>
                            </div>
                        </Link>

                        <div className="flex items-center gap-2">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
                    <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700">
                                <ShieldCheck className="h-4 w-4" />
                                Sistem monitoring sapi & kambing
                            </div>

                            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Pantau kesehatan ternak lebih cepat dan lebih aman.
                            </h1>

                            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                                Pternak membantu peternak memantau kondisi sapi dan kambing secara otomatis menggunakan perangkat IoT, sehingga data kesehatan lebih konsisten dan keputusan lebih tepat.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                {!auth?.user ? (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
                                        >
                                            Masuk
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-50"
                                        >
                                            Daftar sekarang
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
                                    >
                                        Buka dashboard
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_30px_80px_-35px_rgba(14,116,144,0.4)]">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">Status mingguan</p>
                                            <h2 className="text-2xl font-semibold text-slate-900">78 % sehat</h2>
                                        </div>
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span>Bobot rata-rata</span>
                                                <span className="font-medium text-slate-900">428 kg</span>
                                            </div>
                                            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-sky-100">
                                                <div className="h-full w-[72%] rounded-full bg-sky-500" />
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span>Deteksi alert</span>
                                                <span className="font-medium text-amber-600">3 kebutuhan</span>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3">
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span>Sensor aktif</span>
                                                <span className="font-medium text-sky-700">18 perangkat</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-16 grid gap-5 md:grid-cols-3">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        </>
    );
}
