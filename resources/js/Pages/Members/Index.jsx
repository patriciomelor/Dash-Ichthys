import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { 
    Users, 
    Upload, 
    Search,
    MoreVertical,
    FileSpreadsheet,
    X,
    CheckCircle2
} from 'lucide-react';
import Modal from '@/Components/Modal';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { cn } from '@/lib/utils';
import axios from 'axios';

export default function Index({ auth, members }) {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [importSuccess, setImportSuccess] = useState(false);
    const [importError, setImportError] = useState('');
    const fileInputRef = useRef(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const handleFileChange = (e) => {
        setData('file', e.target.files[0]);
        setImportError('');
    };

    const handleImportSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', data.file);

        axios.post('/members/import', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            setImportSuccess(true);
            setTimeout(() => {
                setIsImportModalOpen(false);
                setImportSuccess(false);
                reset('file');
                router.reload(); // Refresh inertia data
            }, 2000);
        }).catch(error => {
            setImportError(error.response?.data?.message || 'Ocurrió un error al importar el archivo.');
        });
    };

    const closeModal = () => {
        setIsImportModalOpen(false);
        reset('file');
        setImportError('');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Directorio de Miembros
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Gestiona los miembros, asistentes y visitas de la iglesia.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <PrimaryButton 
                            onClick={() => setIsImportModalOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 flex items-center gap-2"
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            Importar Excel
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title="Miembros" />

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Buscar por nombre, correo o teléfono..."
                        />
                    </div>
                </div>

                <div className="overflow-visible">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Nombre Completo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Etiqueta
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {members.data.length > 0 ? (
                                members.data.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                                        {String(member.first_name || '').charAt(0)}{String(member.last_name || '').charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {member.first_name} {member.last_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-gray-200">{member.email || '—'}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{member.phone || member.landline || '—'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={cn(
                                                "px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                                                member.label === 'miembro' ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                                                member.label === 'asistente_regular' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                                "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                            )}>
                                                {member.label.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={cn(
                                                "px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
                                                member.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                            )}>
                                                {member.is_active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <a 
                                                    href={`/members/${member.id}`} 
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                                                >
                                                    Ver Perfil
                                                </a>
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
                                                        <Dropdown.Link href={`/members/${member.id}`}>
                                                            Ver Perfil
                                                        </Dropdown.Link>
                                                        <Dropdown.Link href="#" as="button" method="delete" className="text-red-600 hover:text-red-700">
                                                            Eliminar
                                                        </Dropdown.Link>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <Users className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                                        <p className="text-base font-medium">No hay miembros registrados</p>
                                        <p className="text-sm mt-1">Comienza importando un archivo Excel o agregando uno manualmente.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Import Modal */}
            <Modal show={isImportModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Importar Miembros (Excel)
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {importSuccess ? (
                        <div className="py-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">¡Importación Exitosa!</h3>
                            <p className="text-gray-500 mt-2">Los datos se han cargado correctamente.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleImportSubmit} className="space-y-6">
                            <div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Sube un archivo Excel (.xlsx, .csv) con las siguientes columnas: <br/>
                                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded mt-2 inline-block">
                                        first_name, last_name, email, phone, landline, address, label
                                    </span>
                                    <div className="mt-3">
                                        <a href="/members/export-template" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1">
                                            Descargar Plantilla de Ejemplo
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white dark:bg-transparent rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Sube un archivo</span>
                                                <input 
                                                    id="file-upload" 
                                                    name="file-upload" 
                                                    type="file" 
                                                    className="sr-only" 
                                                    accept=".xlsx,.xls,.csv"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className="pl-1">o arrástralo y suéltalo</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {data.file ? data.file.name : "XLSX, XLS o CSV hasta 10MB"}
                                        </p>
                                    </div>
                                </div>
                                
                                {importError && (
                                    <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                                        {importError}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <SecondaryButton onClick={closeModal}>
                                    Cancelar
                                </SecondaryButton>
                                <PrimaryButton 
                                    className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500" 
                                    disabled={!data.file || processing}
                                >
                                    {processing ? 'Procesando...' : 'Importar Archivo'}
                                </PrimaryButton>
                            </div>
                        </form>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
