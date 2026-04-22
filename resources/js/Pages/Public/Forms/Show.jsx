import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ClipboardList, Send, Info } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { cn } from '@/lib/utils';

export default function Show({ form }) {
    const initialData = {
        email: '',
        phone: '',
        responses: {}
    };

    form.fields.forEach(field => {
        initialData.responses[field.id] = '';
    });

    const { data, setData, post, processing, errors } = useForm(initialData);

    const submit = (e) => {
        e.preventDefault();
        post(route('public.forms.store', form.short_url_slug));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Head title={form.title} />

            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                        <ClipboardList className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        {form.title}
                    </h2>
                    {form.description && (
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            {form.description}
                        </p>
                    )}
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl shadow-gray-200/50 dark:shadow-none sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-700">
                    <form onSubmit={submit} className="space-y-8">
                        
                        {/* Datos de Contacto Opcionales */}
                        <div className="bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-10 px-4 sm:px-10 py-6 border-y border-gray-100 dark:border-gray-700 mb-8">
                            <div className="flex items-start gap-3 mb-4 text-indigo-800 dark:text-indigo-300">
                                <Info className="h-5 w-5 mt-0.5" />
                                <p className="text-sm">Si deseas que te contactemos o identifiquemos tu respuesta, puedes dejar tus datos.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="email" value="Correo Electrónico (Opcional)" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="tu@email.com"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="phone" value="Teléfono (Opcional)" />
                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        className="mt-1 block w-full"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+56 9 1234 5678"
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Campos Dinámicos */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Preguntas</h3>
                            {form.fields.map((field) => (
                                <div key={field.id} className="space-y-1">
                                    <InputLabel 
                                        htmlFor={`field_${field.id}`} 
                                        value={
                                            <span className="flex items-center">
                                                {field.name}
                                                {field.is_required && <span className="text-red-500 ml-1 text-base">*</span>}
                                            </span>
                                        } 
                                        className="text-base font-medium"
                                    />
                                    
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={`field_${field.id}`}
                                            className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-lg shadow-sm"
                                            rows="4"
                                            required={field.is_required}
                                            value={data.responses[field.id] || ''}
                                            onChange={(e) => setData('responses', { ...data.responses, [field.id]: e.target.value })}
                                        />
                                    ) : field.type === 'number' ? (
                                        <TextInput
                                            id={`field_${field.id}`}
                                            type="number"
                                            className="w-full"
                                            required={field.is_required}
                                            value={data.responses[field.id] || ''}
                                            onChange={(e) => setData('responses', { ...data.responses, [field.id]: e.target.value })}
                                        />
                                    ) : field.type === 'date' ? (
                                        <TextInput
                                            id={`field_${field.id}`}
                                            type="date"
                                            className="w-full"
                                            required={field.is_required}
                                            value={data.responses[field.id] || ''}
                                            onChange={(e) => setData('responses', { ...data.responses, [field.id]: e.target.value })}
                                        />
                                    ) : (
                                        <TextInput
                                            id={`field_${field.id}`}
                                            type="text"
                                            className="w-full"
                                            required={field.is_required}
                                            value={data.responses[field.id] || ''}
                                            onChange={(e) => setData('responses', { ...data.responses, [field.id]: e.target.value })}
                                        />
                                    )}
                                    <InputError message={errors[`responses.${field.id}`]} className="mt-2" />
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <PrimaryButton className="w-full justify-center h-12 text-base" disabled={processing}>
                                <Send className="h-5 w-5 mr-2" />
                                Enviar Respuesta
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Potenciado por <span className="font-semibold text-gray-900 dark:text-gray-300">Dash Ichthys</span>
                </div>
            </div>
        </div>
    );
}
