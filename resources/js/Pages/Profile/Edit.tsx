import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ShieldCheck, UserCircle2 } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Account</p>
                    <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-5 md:grid-cols-[260px_minmax(0,1fr)]">
                    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                            <UserCircle2 className="h-7 w-7" />
                        </div>
                        <h3 className="mt-5 text-xl font-semibold text-slate-900">Pengaturan akun</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Kelola identitas, keamanan, dan akses akun Pternak Anda.</p>
                        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                            <ShieldCheck className="h-4 w-4" /> Akun terlindungi
                        </div>
                    </aside>

                    <div className="space-y-5">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-3xl border border-red-200 bg-red-50/40 p-6 shadow-sm sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
