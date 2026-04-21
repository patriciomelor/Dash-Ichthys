import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft,
    Construction
} from 'lucide-react';

export default function Edit({ auth, form }) {
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
            <Head title="Editar Formulario" />

            <div className="max-w-4xl mx-auto pb-12 mt-12 text-center">
                <Construction className="mx-auto h-24 w-24 text-indigo-300 dark:text-indigo-800 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Sección en Construcción</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    La edición de formularios y sus campos estará disponible próximamente.
                </p>
                <div className="mt-8">
                    <Link 
                        href={`/forms/${form.id}`} 
                        className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium"
                    >
                        Volver a los detalles del formulario
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
