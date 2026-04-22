import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Building, 
    ArrowLeft,
    Users,
    Plus,
    X,
    Trash2
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';

export default function Show({ auth, ministry, availableMembers }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        member_id: '',
        role: 'integrante'
    });

    const handleAddMember = (e) => {
        e.preventDefault();
        post(route('ministries.members.add', ministry.id), {
            onSuccess: () => {
                closeModal();
                router.reload();
            }
        });
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
        reset();
    };

    const removeMember = (memberId) => {
        if (confirm('¿Estás seguro de remover a este integrante del ministerio?')) {
            router.delete(route('ministries.members.remove', { id: ministry.id, member_id: memberId }));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href="/ministries" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Link>
                    <div className="flex-1 flex items-center gap-3">
                        <div 
                            className="h-10 w-10 rounded-lg flex items-center justify-center bg-opacity-10 dark:bg-opacity-20"
                            style={{ backgroundColor: `${ministry.color_hex || '#4f46e5'}20`, color: ministry.color_hex || '#4f46e5' }}
                        >
                            <Building className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {ministry.name}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gestión de integrantes del ministerio</p>
                        </div>
                    </div>
                    <div>
                        <PrimaryButton onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Agregar Integrante
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title={`Ministerio: ${ministry.name}`} />

            <div className="max-w-7xl mx-auto space-y-6 pb-12">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <Users className="h-5 w-5 text-indigo-500" />
                            Integrantes del Ministerio ({ministry.members.length})
                        </h3>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Nombre</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Rol</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {ministry.members.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                                    {String(member.first_name || '').charAt(0)}{String(member.last_name || '').charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        <Link href={`/members/${member.id}`} className="hover:underline">
                                                            {member.first_name} {member.last_name}
                                                        </Link>
                                                    </div>
                                                    <div className="text-sm text-gray-500">{member.email || member.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded text-xs font-medium uppercase tracking-wider">
                                                {member.pivot.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => removeMember(member.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                title="Remover integrante"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {ministry.members.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <Users className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                                            <p>No hay integrantes registrados en este ministerio.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Member Modal */}
            <Modal show={isAddModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            Agregar Integrante
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleAddMember} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="member_id" value="Seleccionar Miembro" />
                            <select
                                id="member_id"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                value={data.member_id}
                                onChange={(e) => setData('member_id', e.target.value)}
                                required
                            >
                                <option value="" disabled>Seleccione una persona...</option>
                                {availableMembers.map(member => (
                                    <option key={member.id} value={member.id}>
                                        {member.first_name} {member.last_name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.member_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="role" value="Rol o Cargo" />
                            <select
                                id="role"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            >
                                <option value="integrante">Integrante</option>
                                <option value="lider">Líder</option>
                                <option value="co-lider">Co-Líder</option>
                                <option value="servidor">Servidor</option>
                                <option value="tesorero">Tesorero</option>
                            </select>
                            <InputError message={errors.role} className="mt-2" />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                            <SecondaryButton onClick={closeModal} type="button">Cancelar</SecondaryButton>
                            <PrimaryButton disabled={processing || !data.member_id}>
                                Agregar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
