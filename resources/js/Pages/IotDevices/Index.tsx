import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import IotDeviceFormModal from '@/Components/IotDeviceFormModal';
import Modal from '@/Components/Modal';
import { Head, router } from '@inertiajs/react';
import { Cpu, Eye, PencilLine, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Animal {
    id: number;
    code: string;
    name: string | null;
}

interface Device {
    id: number;
    device_code: string;
    type: string | null;
    animal_id: number | null;
    api_token: string;
    animal: Animal | null;
}

export default function Index({ devices, animals }: { devices: Device[]; animals: Animal[] }) {
    const [formMode, setFormMode] = useState<'create' | 'edit' | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<Device | undefined>();
    const [viewDevice, setViewDevice] = useState<Device | null>(null);
    const [deleteDevice, setDeleteDevice] = useState<Device | null>(null);
    const [deleting, setDeleting] = useState(false);

    const openEdit = (device: Device) => {
        setSelectedDevice(device);
        setFormMode('edit');
    };

    const handleDelete = (id: number) => {
        setDeleting(true);
        router.delete(route('iot-devices.destroy', id), {
            onFinish: () => setDeleting(false),
            onSuccess: () => setDeleteDevice(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Perangkat</p>
                        <h2 className="text-2xl font-bold text-slate-900">Alat IoT</h2>
                    </div>
                    <button
                        onClick={() => { setSelectedDevice(undefined); setFormMode('create'); }}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Alat
                    </button>
                </div>
            }
        >
            <Head title="Alat IoT" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                                <Cpu className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">Daftar Alat</h3>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-sm text-slate-600">
                                    <th className="px-5 py-3 font-medium">Kode Alat</th>
                                    <th className="px-5 py-3 font-medium">Tipe</th>
                                    <th className="px-5 py-3 font-medium">Terpasang di</th>
                                    <th className="px-5 py-3 font-medium">Token</th>
                                    <th className="px-5 py-3 text-right font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device) => (
                                    <tr key={device.id} className="border-b border-slate-200 transition hover:bg-sky-50/40">
                                        <td className="px-5 py-4 align-middle">
                                            <button type="button" onClick={() => setViewDevice(device)} className="inline-flex items-center gap-2 font-medium text-sky-700 transition hover:text-sky-800">
                                                {device.device_code}
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                        <td className="px-5 py-4 align-middle text-slate-700">{device.type ?? '-'}</td>
                                        <td className="px-5 py-4 align-middle text-slate-700">{device.animal ? device.animal.code : '-'}</td>
                                        <td className="px-5 py-4 align-middle font-mono text-xs text-slate-600">{device.api_token}</td>
                                        <td className="px-5 py-4 align-middle">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEdit(device)}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
                                                >
                                                    <PencilLine className="h-3.5 w-3.5" />
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteDevice(device)}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {devices.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                                            Belum ada data alat IoT.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <IotDeviceFormModal
                key={`${formMode}-${selectedDevice?.id ?? 'new'}`}
                show={formMode !== null}
                device={formMode === 'edit' ? selectedDevice : undefined}
                animals={animals}
                onClose={() => setFormMode(null)}
            />

            <ConfirmDeleteModal
                show={Boolean(deleteDevice)}
                title="Hapus perangkat?"
                description={deleteDevice ? `Perangkat ${deleteDevice.device_code} akan dihapus permanen dan tidak dapat dipulihkan.` : ''}
                processing={deleting}
                onClose={() => setDeleteDevice(null)}
                onConfirm={() => deleteDevice && handleDelete(deleteDevice.id)}
            />

            <Modal show={Boolean(viewDevice)} onClose={() => setViewDevice(null)} maxWidth="md">
                {viewDevice && (
                    <div className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">Detail perangkat</p>
                                <h3 className="mt-1 text-2xl font-bold text-slate-900">{viewDevice.device_code}</h3>
                            </div>
                            <button type="button" onClick={() => setViewDevice(null)} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <dl className="mt-6 space-y-4 text-sm">
                            <div className="flex justify-between gap-4 border-b border-slate-200 pb-3"><dt className="text-slate-500">Tipe</dt><dd className="font-medium text-slate-900">{viewDevice.type ?? '-'}</dd></div>
                            <div className="flex justify-between gap-4 border-b border-slate-200 pb-3"><dt className="text-slate-500">Terpasang di</dt><dd className="font-medium text-slate-900">{viewDevice.animal?.code ?? '-'}</dd></div>
                            <div className="flex flex-col gap-2"><dt className="text-slate-500">API token</dt><dd className="break-all rounded-xl bg-slate-50 p-3 font-mono text-xs text-slate-800">{viewDevice.api_token}</dd></div>
                        </dl>
                        <div className="mt-6 flex justify-end">
                            <button type="button" onClick={() => { setViewDevice(null); openEdit(viewDevice); }} className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">
                                <PencilLine className="h-4 w-4" /> Edit perangkat
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
