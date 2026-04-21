import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Settings as SettingsIcon,
    Palette,
    Upload,
    Save,
    CheckCircle2
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';

export default function Index({ auth, settings }) {
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        church_name: settings.church_name || 'Mi Iglesia',
        primary_color: settings.primary_color || '#4f46e5',
        secondary_color: settings.secondary_color || '#db2777',
        is_dark_mode: settings.is_dark_mode || false,
    });

    useEffect(() => {
        if (recentlySuccessful) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.update'), {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <SettingsIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                            Configuración del Portal
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Personaliza la apariencia y los datos principales de tu iglesia.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Configuración del Portal" />

            <div className="max-w-4xl pb-12">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Información General */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3 mb-5">
                                    Información General
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel htmlFor="church_name" value="Nombre de la Iglesia" />
                                        <TextInput
                                            id="church_name"
                                            className="mt-1 block w-full text-lg"
                                            value={data.church_name}
                                            onChange={(e) => setData('church_name', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.church_name} />
                                    </div>
                                    
                                    <div className="col-span-1 md:col-span-2">
                                        <InputLabel value="Logo de la Iglesia (Próximamente)" />
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                            <div className="space-y-1 text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                                    <span className="relative font-medium text-indigo-600 dark:text-indigo-400">
                                                        Subir un archivo
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG hasta 2MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Apariencia */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3 mb-5 flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-gray-400" />
                                    Identidad Visual
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="primary_color" value="Color Principal" />
                                        <div className="flex items-center gap-3 mt-1">
                                            <input
                                                type="color"
                                                id="primary_color"
                                                className="h-10 w-14 rounded cursor-pointer border-0 p-0"
                                                value={data.primary_color}
                                                onChange={(e) => setData('primary_color', e.target.value)}
                                            />
                                            <TextInput
                                                type="text"
                                                className="block w-full uppercase"
                                                value={data.primary_color}
                                                onChange={(e) => setData('primary_color', e.target.value)}
                                                maxLength="7"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Usado en botones primarios y encabezados.</p>
                                        <InputError className="mt-2" message={errors.primary_color} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="secondary_color" value="Color Secundario" />
                                        <div className="flex items-center gap-3 mt-1">
                                            <input
                                                type="color"
                                                id="secondary_color"
                                                className="h-10 w-14 rounded cursor-pointer border-0 p-0"
                                                value={data.secondary_color}
                                                onChange={(e) => setData('secondary_color', e.target.value)}
                                            />
                                            <TextInput
                                                type="text"
                                                className="block w-full uppercase"
                                                value={data.secondary_color}
                                                onChange={(e) => setData('secondary_color', e.target.value)}
                                                maxLength="7"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Usado en acentos y elementos secundarios.</p>
                                        <InputError className="mt-2" message={errors.secondary_color} />
                                    </div>
                                    
                                    <div className="col-span-1 md:col-span-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900"
                                                checked={data.is_dark_mode}
                                                onChange={(e) => {
                                                    setData('is_dark_mode', e.target.checked);
                                                    if (e.target.checked) {
                                                        document.documentElement.classList.add('dark');
                                                    } else {
                                                        document.documentElement.classList.remove('dark');
                                                    }
                                                }}
                                            />
                                            <span className="text-gray-900 dark:text-white font-medium">Forzar Modo Oscuro</span>
                                        </label>
                                        <p className="mt-1 ml-8 text-xs text-gray-500">
                                            Activa esta opción para que el portal siempre se muestre en modo oscuro para todos los usuarios.
                                        </p>
                                        <InputError className="mt-2" message={errors.is_dark_mode} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center">
                                    {showSuccess && (
                                        <span className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-in fade-in duration-300">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Guardado correctamente.
                                        </span>
                                    )}
                                </div>
                                <PrimaryButton disabled={processing} className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Guardar Cambios
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
