import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ClipboardList, 
    Plus, 
    Search,
    MoreVertical,
    Calendar,
    MessageSquare
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

export default function Index({ auth, forms }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Formularios
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Crea y administra formularios para recolección de datos y respuestas.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/forms/create">
                            <PrimaryButton className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Nuevo Formulario
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Formularios" />

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Buscar formularios..."
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms?.data?.length > 0 ? (
                    forms.data.map((form) => (
                        <div key={form.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
                            <div className="p-5 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                                        <ClipboardList className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    <Link href={`/forms/${form.id}`}>
                                        {form.title}
                                    </Link>
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                                    {form.description || 'Sin descripción'}
                                </p>
                                
                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                                        {form.responses_count} respuestas
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                        Expira: {form.valid_until ? dayjs(form.valid_until).format('DD/MM/YYYY') : 'Nunca'}
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 rounded-b-xl flex justify-between items-center">
                                <span className={cn(
                                    "px-2 py-1 text-xs font-medium rounded-md",
                                    !form.is_deleted ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                )}>
                                    {!form.is_deleted ? 'Activo' : 'Cerrado'}
                                </span>
                                <Link 
                                    href={`/forms/${form.id}/edit`} 
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    Editar
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm border-dashed">
                        <ClipboardList className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No hay formularios</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Comienza creando tu primer formulario dinámico.</p>
                        <div className="mt-6">
                            <Link href="/forms/create">
                                <PrimaryButton className="flex items-center gap-2 mx-auto">
                                    <Plus className="h-4 w-4" />
                                    Nuevo Formulario
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
