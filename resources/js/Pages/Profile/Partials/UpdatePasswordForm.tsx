import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (event) => {
        event.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (formErrors) => {
                if (formErrors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (formErrors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-semibold text-slate-900">Keamanan password</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Gunakan password panjang dan unik untuk menjaga keamanan akun.</p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-5">
                <div>
                    <InputLabel htmlFor="current_password" value="Password saat ini" />
                    <TextInput id="current_password" ref={currentPasswordInput} value={data.current_password} onChange={(event) => setData('current_password', event.target.value)} type="password" className="mt-2" autoComplete="current-password" />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="password" value="Password baru" />
                    <TextInput id="password" ref={passwordInput} value={data.password} onChange={(event) => setData('password', event.target.value)} type="password" className="mt-2" autoComplete="new-password" />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi password baru" />
                    <TextInput id="password_confirmation" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} type="password" className="mt-2" autoComplete="new-password" />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <PrimaryButton disabled={processing}>{processing ? 'Memperbarui...' : 'Perbarui password'}</PrimaryButton>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm font-medium text-emerald-600">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
