import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Users, 
    UserPlus, 
    MoreVertical,
    ShieldCheck,
    X
} from 'lucide-react';
import Modal from '@/Components/Modal';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { cn } from '@/lib/utils';

export default function Index({ auth, users, roles }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'colaborador'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
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
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            Usuarios y Roles
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Administra el acceso al portal y asigna permisos a tu equipo.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <PrimaryButton onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Nuevo Usuario
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title="Usuarios y Roles" />

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 mb-12">
                <div className="overflow-visible">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Fecha de Registro
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                                        {user.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.roles && user.roles.map((role) => (
                                                <span key={role.id} className={cn(
                                                    "px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full uppercase mr-2",
                                                    role.name === 'super-admin' ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                                                    role.name === 'pastor' ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" :
                                                    role.name === 'lider' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                                    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                )}>
                                                    {role.name}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                        >
                                                            <MoreVertical className="h-5 w-5" />
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content align="right" width="48">
                                                    <Dropdown.Link href="#" as="button">
                                                        Editar Usuario
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href="#" as="button" method="delete" className="text-red-600 hover:text-red-700">
                                                        Eliminar
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <Users className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                                        <p className="text-base font-medium">No hay usuarios registrados</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <UserPlus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            Añadir Nuevo Usuario
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-500 transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre Completo" />
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="role" value="Rol en el Sistema" />
                            <select
                                id="role"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm uppercase text-sm"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                            >
                                {roles.map(role => (
                                    <option key={role.id} value={role.name}>{role.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.role} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="password" value="Contraseña" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Crear Usuario
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
