import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    const deleteUser: FormEventHandler = (event) => {
        event.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-5 ${className}`}>
            <header>
                <h2 className="text-xl font-semibold text-red-800">Hapus akun</h2>
                <p className="mt-1 text-sm leading-6 text-red-700/80">Setelah akun dihapus, seluruh data akun akan dihapus permanen. Pastikan Anda sudah menyimpan data yang diperlukan.</p>
            </header>

            <DangerButton onClick={() => setConfirmingUserDeletion(true)}>Hapus akun permanen</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal} maxWidth="md">
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-semibold text-slate-900">Hapus akun sekarang?</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Masukkan password untuk mengonfirmasi penghapusan akun secara permanen.</p>
                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />
                        <TextInput id="password" type="password" name="password" ref={passwordInput} value={data.password} onChange={(event) => setData('password', event.target.value)} className="mt-1" isFocused placeholder="Masukkan password" />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <DangerButton disabled={processing}>{processing ? 'Menghapus...' : 'Hapus akun'}</DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
