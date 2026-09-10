import Modal from '@/Components/Modal';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmDeleteModal({
    show,
    title,
    description,
    processing = false,
    onClose,
    onConfirm,
}: {
    show: boolean;
    title: string;
    description: string;
    processing?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
                        Batal
                    </button>
                    <button type="button" onClick={onConfirm} disabled={processing} className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
                        <Trash2 className="h-4 w-4" />
                        {processing ? 'Menghapus...' : 'Hapus'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}