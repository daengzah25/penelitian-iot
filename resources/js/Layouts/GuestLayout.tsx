import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-sky-50 via-white to-blue-50 px-4 pt-6 sm:justify-center sm:pt-0">
            <div className="mb-6 text-center">
                <Link href="/" className="inline-flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-200">
                        <ApplicationLogo className="h-8 w-8" />
                    </div>
                    <span className="text-sm font-semibold tracking-[0.22em] text-sky-700 uppercase">Pternak</span>
                </Link>
            </div>

            <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-xl shadow-sky-100 sm:max-w-md sm:px-8">
                {children}
            </div>
        </div>
    );
}
