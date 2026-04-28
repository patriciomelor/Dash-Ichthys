import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { 
    ClipboardList, 
    Trash2,
    Save,
    ArrowLeft,
    AlertCircle
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import DangerButton from '@/Components/DangerButton';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Edit({ auth, form }) {
    // Format valid_until to datetime-local format if it exists
    const formatDateTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    const { data, setData, put, processing, errors } = useForm({
        title: form.title || '',
        description: form.description || '',
        valid_until: formatDateTime(form.valid_until) || '',
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('forms.update', form.id));
    };

    const handleDelete = () => {
        router.delete(route('forms.destroy', form.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={`/forms/${form.id}`} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Editar Formulario
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title={`Editar: ${form.title}`} />

            <div className="max-w-4xl mx-auto pb-12 mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Info */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3 mb-5">
                            Información General
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="title" value="Título del Formulario" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full text-lg"
                                    isFocused={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ej: Registro para Retiro de Jóvenes"
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Descripción (Opcional)" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    rows="3"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Instrucciones breves o propósito del formulario..."
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="valid_until" value="Fecha de Vencimiento (Opcional)" />
                                <TextInput
                                    id="valid_until"
                                    type="datetime-local"
                                    name="valid_until"
                                    value={data.valid_until}
                                    className="mt-1 block w-full sm:w-1/2"
                                    onChange={(e) => setData('valid_until', e.target.value)}
                                />
                                <InputError message={errors.valid_until} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Form Fields Builder (Read Only) */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-700 pb-3 mb-5">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                    Campos del Formulario
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                                    <AlertCircle className="h-4 w-4" /> 
                                    Por seguridad e integridad de los datos, la estructura de campos está bloqueada una vez creado el formulario.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 opacity-80 pointer-events-none">
                            {form.fields.length === 0 && (
                                <p className="text-center text-gray-500 py-4 italic text-sm">No hay campos personalizados.</p>
                            )}
                            
                            {form.fields.map((field) => (
                                <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-100 dark:bg-gray-900/80 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex-1 w-full space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                                        <div className="flex-1">
                                            <InputLabel value="Nombre de la Pregunta/Campo" className="text-xs mb-1" />
                                            <TextInput
                                                type="text"
                                                className="block w-full text-sm bg-gray-50 dark:bg-gray-800"
                                                value={field.name}
                                                readOnly
                                            />
                                        </div>
                                        <div className="sm:w-48">
                                            <InputLabel value="Tipo de Respuesta" className="text-xs mb-1" />
                                            <select
                                                className="block w-full text-sm border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm"
                                                value={field.type}
                                                disabled
                                            >
                                                <option value="text">Texto Corto</option>
                                                <option value="textarea">Texto Largo</option>
                                                <option value="number">Número</option>
                                                <option value="date">Fecha</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center sm:w-auto sm:mt-6">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm"
                                                    checked={field.is_required}
                                                    readOnly
                                                    disabled
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Obligatorio</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        {showDeleteConfirm ? (
                            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/50">
                                <span className="text-sm text-red-800 dark:text-red-200 font-medium">¿Estás seguro? Esta acción no se puede deshacer.</span>
                                <DangerButton type="button" onClick={handleDelete}>
                                    Sí, Eliminar Permanentemente
                                </DangerButton>
                                <SecondaryButton type="button" onClick={() => setShowDeleteConfirm(false)}>
                                    Cancelar
                                </SecondaryButton>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <Trash2 className="h-4 w-4" />
                                Eliminar Formulario
                            </button>
                        )}
                        
                        <div className="flex items-center gap-4">
                            <Link href={`/forms/${form.id}`} className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                                Cancelar
                            </Link>
                            <PrimaryButton disabled={processing} className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Guardar Cambios
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
