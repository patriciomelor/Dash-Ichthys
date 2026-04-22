import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Success({ form }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Head title="Respuesta Enviada" />

            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 text-center">
                <div className="mx-auto h-24 w-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    ¡Gracias!
                </h2>
                
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    Tu respuesta para el formulario <span className="font-semibold text-gray-700 dark:text-gray-300">"{form.title}"</span> ha sido enviada con éxito.
                </p>

                <div className="pt-8">
                    <a href="https://dashichthys.com" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Volver al inicio
                    </a>
                </div>
            </div>
        </div>
    );
}
