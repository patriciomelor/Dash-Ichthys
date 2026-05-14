import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Users, 
    UserPlus, 
    MoreVertical,
    ShieldCheck,
    X,
    Eye,
    EyeOff,
    Check
} from 'lucide-react';
import Modal from '@/Components/Modal';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { cn } from '@/lib/utils';

export default function Index({ auth, users, roles, tags }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const passwordConditions = [
        { id: 'length', text: 'Mínimo 8 caracteres', regex: /.{8,}/ },
        { id: 'uppercase', text: 'Al menos una mayúscula', regex: /[A-Z]/ },
        { id: 'lowercase', text: 'Al menos una minúscula', regex: /[a-z]/ },
        { id: 'number', text: 'Al menos un número', regex: /[0-9]/ },
        { id: 'special', text: 'Un símbolo especial (@$!%*?&...)', regex: /[^A-Za-z0-9]/ },
    ];

    const checkCondition = (pass, regex) => regex.test(pass || '');

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
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

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', editingUser.id), {
            onSuccess: () => {
                closeEditModal();
                router.reload();
            }
        });
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            role: user.roles && user.roles.length > 0 ? user.roles[0].name : 'colaborador'
        });
        clearErrors();
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setShowPassword(false);
        reset();
        clearErrors();
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingUser(null);
        setShowPassword(false);
        reset();
        clearErrors();
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
                                            {user.roles && user.roles.map((role) => {
                                                const tagObj = tags ? tags.find(t => t.name.toLowerCase() === role.name.toLowerCase()) : null;
                                                return (
                                                    <span key={role.id} 
                                                        className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full uppercase mr-2 shadow-sm"
                                                        style={{ 
                                                            backgroundColor: tagObj ? tagObj.bg_color : '#f3f4f6', 
                                                            color: tagObj ? tagObj.text_color : '#1f2937' 
                                                        }}
                                                    >
                                                        {role.name}
                                                    </span>
                                                );
                                            })}
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
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(user)}
                                                        className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                                    >
                                                        Editar Usuario
                                                    </button>
                                                    <Dropdown.Link href={route('users.destroy', user.id)} as="button" method="delete" className="text-red-600 hover:text-red-700">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="password" value="Contraseña" />
                                <div className="relative mt-1">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="block w-full pr-10"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                                <div className="relative mt-1">
                                    <TextInput
                                        id="password_confirmation"
                                        type={showPassword ? "text" : "password"}
                                        className="block w-full pr-10"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {data.password && (
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Requisitos de la contraseña:</p>
                                <div className="space-y-1">
                                    {passwordConditions.map(cond => {
                                        const isValid = checkCondition(data.password, cond.regex);
                                        return (
                                            <div key={cond.id} className={`flex items-center text-xs transition-colors duration-200 ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                                {isValid ? <Check className="h-3 w-3 mr-1.5 flex-shrink-0" /> : <X className="h-3 w-3 mr-1.5 flex-shrink-0" />}
                                                {cond.text}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Crear Usuario
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={closeEditModal} maxWidth="md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            Editar Usuario
                        </h2>
                        <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-500 transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="edit_name" value="Nombre Completo" />
                            <TextInput
                                id="edit_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="edit_email" value="Correo Electrónico" />
                            <TextInput
                                id="edit_email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="edit_role" value="Rol en el Sistema" />
                            <select
                                id="edit_role"
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

                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50 mt-4">
                            <p className="text-xs text-yellow-800 dark:text-yellow-300 font-medium mb-3">
                                Deja los campos de contraseña en blanco si no deseas cambiarla.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="edit_password" value="Nueva Contraseña" />
                                    <div className="relative mt-1">
                                        <TextInput
                                            id="edit_password"
                                            type={showPassword ? "text" : "password"}
                                            className="block w-full pr-10"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="edit_password_confirmation" value="Confirmar Nueva" />
                                    <div className="relative mt-1">
                                        <TextInput
                                            id="edit_password_confirmation"
                                            type={showPassword ? "text" : "password"}
                                            className="block w-full pr-10"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {data.password && (
                                <div className="mt-3 bg-white dark:bg-gray-800 p-3 rounded border border-gray-100 dark:border-gray-700">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Requisitos de la contraseña:</p>
                                    <div className="space-y-1">
                                        {passwordConditions.map(cond => {
                                            const isValid = checkCondition(data.password, cond.regex);
                                            return (
                                                <div key={cond.id} className={`flex items-center text-xs transition-colors duration-200 ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                                    {isValid ? <Check className="h-3 w-3 mr-1.5 flex-shrink-0" /> : <X className="h-3 w-3 mr-1.5 flex-shrink-0" />}
                                                    {cond.text}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                            <SecondaryButton onClick={closeEditModal}>Cancelar</SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Guardar Cambios
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
