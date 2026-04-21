import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Building, 
    Plus, 
    MoreVertical,
    Users,
    Settings,
    X
} from 'lucide-react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { cn } from '@/lib/utils';

export default function Index({ auth, ministries }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        color: '#4f46e5'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('ministries.store'), {
            onSuccess: () => {
                closeModal();
                router.reload();
            }
        });
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Mi Iglesia (Ministerios)
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Administra los ministerios, departamentos y grupos de la iglesia.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <PrimaryButton onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Nuevo Ministerio
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title="Ministerios" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                {ministries.length > 0 ? (
                    ministries.map((ministry) => (
                        <div key={ministry.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                            <div className="h-2 w-full" style={{ backgroundColor: ministry.color || '#4f46e5' }}></div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div 
                                        className="h-12 w-12 rounded-xl flex items-center justify-center bg-opacity-10 dark:bg-opacity-20"
                                        style={{ backgroundColor: `${ministry.color}20`, color: ministry.color }}
                                    >
                                        <Building className="h-6 w-6" />
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {ministry.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 line-clamp-3">
                                    {ministry.description || 'Sin descripción.'}
                                </p>
                                
                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                                        {ministry.members_count || 0} Integrantes
                                    </div>
                                    <button className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium transition-colors">
                                        Gestionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-dashed">
                        <div className="mx-auto h-16 w-16 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center mb-4">
                            <Building className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Aún no hay ministerios</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            Comienza estructurando tu iglesia creando departamentos como "Alabanza", "Jóvenes", "Escuela Dominical", etc.
                        </p>
                        <div className="mt-6">
                            <PrimaryButton onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 mx-auto">
                                <Plus className="h-4 w-4" />
                                Crear el primer ministerio
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            Nuevo Ministerio
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre del Ministerio" />
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej: Ministerio de Alabanza"
                                required
                                isFocused
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Descripción" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                rows="3"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Propósito u objetivos del grupo..."
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="color" value="Color Identificativo" />
                            <div className="flex items-center gap-3 mt-1">
                                <input
                                    type="color"
                                    id="color"
                                    className="h-10 w-14 rounded cursor-pointer border-0 p-0"
                                    value={data.color}
                                    onChange={(e) => setData('color', e.target.value)}
                                />
                                <TextInput
                                    type="text"
                                    className="block w-full uppercase"
                                    value={data.color}
                                    onChange={(e) => setData('color', e.target.value)}
                                    maxLength="7"
                                />
                            </div>
                            <InputError message={errors.color} className="mt-2" />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Guardar Ministerio
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
