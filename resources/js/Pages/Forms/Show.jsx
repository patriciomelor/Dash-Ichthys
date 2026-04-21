import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ClipboardList,
    ArrowLeft,
    Calendar,
    Users,
    Settings,
    Edit
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';

export default function Show({ auth, form }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href="/forms" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Link>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <ClipboardList className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            {form.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={`/forms/${form.id}/edit`}>
                            <PrimaryButton className="bg-indigo-600 flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Editar
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Formulario: ${form.title}`} />

            <div className="max-w-5xl mx-auto space-y-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Descripción</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {form.description || 'Sin descripción.'}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Campos del Formulario ({form.fields.length})
                            </h3>
                            <div className="space-y-4">
                                {form.fields.map((field, i) => (
                                    <div key={field.id} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                {i + 1}. {field.name}
                                                {field.is_required && <span className="text-red-500 ml-1">*</span>}
                                            </h4>
                                            <span className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded">
                                                {field.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {form.fields.length === 0 && (
                                    <p className="text-gray-500 italic">No hay campos configurados.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Detalles</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Fecha de Creación</p>
                                        <p className="text-sm text-gray-500">{dayjs(form.created_at).format('DD/MM/YYYY HH:mm')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-red-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Válido Hasta</p>
                                        <p className="text-sm text-gray-500">{form.valid_until ? dayjs(form.valid_until).format('DD/MM/YYYY') : 'Sin expiración'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Settings className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Estado</p>
                                        <p className="text-sm text-gray-500">{!form.is_deleted ? 'Activo' : 'Cerrado'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
