import React from 'react';
import { Head } from '@inertiajs/react';
import { Ban } from 'lucide-react';

export default function Closed({ title }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Head title="Formulario Cerrado" />

            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 text-center">
                <div className="mx-auto h-24 w-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                    <Ban className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
                
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Formulario Cerrado
                </h2>
                
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                    Lo sentimos, el formulario <span className="font-semibold text-gray-700 dark:text-gray-300">"{title}"</span> ya no acepta más respuestas.
                </p>
            </div>
        </div>
    );
}
