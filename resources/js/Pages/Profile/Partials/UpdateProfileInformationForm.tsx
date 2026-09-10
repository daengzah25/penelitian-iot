import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-semibold text-slate-900">Informasi Profile</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Perbarui nama dan alamat email yang digunakan pada akun Anda.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput id="name" className="mt-2" value={data.name} onChange={(event) => setData('name', event.target.value)} required isFocused autoComplete="name" />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" className="mt-2" value={data.email} onChange={(event) => setData('email', event.target.value)} required autoComplete="username" />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        <p>Email Anda belum terverifikasi.</p>
                        <Link href={route('verification.send')} method="post" as="button" className="mt-2 font-semibold underline hover:text-amber-900">
                            Kirim ulang email verifikasi
                        </Link>
                        {status === 'verification-link-sent' && <div className="mt-2 font-medium text-emerald-700">Link verifikasi baru telah dikirim ke email Anda.</div>}
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                    <PrimaryButton disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan perubahan'}</PrimaryButton>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm font-medium text-emerald-600">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
