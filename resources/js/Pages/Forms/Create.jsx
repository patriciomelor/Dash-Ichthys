import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    ClipboardList, 
    Plus, 
    Trash2,
    Save,
    ArrowLeft
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { cn } from '@/lib/utils';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        valid_until: '',
        fields: [
            { id: Date.now(), name: '', type: 'text', is_required: false }
        ]
    });

    const addField = () => {
        setData('fields', [...data.fields, { id: Date.now(), name: '', type: 'text', is_required: false }]);
    };

    const removeField = (id) => {
        setData('fields', data.fields.filter(f => f.id !== id));
    };

    const updateField = (id, key, value) => {
        setData('fields', data.fields.map(f => f.id === id ? { ...f, [key]: value } : f));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('forms.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href="/forms" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Crear Formulario
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Crear Formulario" />

            <div className="max-w-4xl mx-auto pb-12">
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

                    {/* Form Fields Builder */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 mb-5">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Campos del Formulario
                            </h3>
                            <SecondaryButton onClick={addField} type="button" className="text-xs py-1.5">
                                <Plus className="h-3 w-3 mr-1" />
                                Agregar Campo
                            </SecondaryButton>
                        </div>

                        <div className="space-y-4">
                            {data.fields.length === 0 && (
                                <p className="text-center text-gray-500 py-4 italic text-sm">No has agregado ningún campo personalizado.</p>
                            )}
                            
                            {data.fields.map((field, index) => (
                                <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 relative group transition-colors hover:border-indigo-200 dark:hover:border-indigo-900/50">
                                    <div className="flex-1 w-full space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                                        <div className="flex-1">
                                            <InputLabel value="Nombre de la Pregunta/Campo" className="text-xs mb-1" />
                                            <TextInput
                                                type="text"
                                                className="block w-full text-sm"
                                                placeholder="Ej: Edad, Alergias, etc."
                                                value={field.name}
                                                onChange={(e) => updateField(field.id, 'name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="sm:w-48">
                                            <InputLabel value="Tipo de Respuesta" className="text-xs mb-1" />
                                            <select
                                                className="block w-full text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                value={field.type}
                                                onChange={(e) => updateField(field.id, 'type', e.target.value)}
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
                                                    className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                                                    checked={field.is_required}
                                                    onChange={(e) => updateField(field.id, 'is_required', e.target.checked)}
                                                />
                                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Obligatorio</span>
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeField(field.id)}
                                        className="absolute right-2 top-2 sm:static p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                        title="Eliminar campo"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link href="/forms" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                            Cancelar
                        </Link>
                        <PrimaryButton disabled={processing} className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Guardar Formulario
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
