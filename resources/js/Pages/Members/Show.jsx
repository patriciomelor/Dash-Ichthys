import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    User,
    ArrowLeft,
    Phone,
    Mail,
    MapPin,
    Calendar,
    MessageSquare,
    Send
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { cn } from '@/lib/utils';

dayjs.extend(relativeTime);
dayjs.locale('es');

export default function Show({ auth, member }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        comment: ''
    });

    const submitComment = (e) => {
        e.preventDefault();
        post(route('members.comments.add', member.id), {
            preserveScroll: true,
            onSuccess: () => reset('comment')
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href="/members" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Link>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm">
                                {member.first_name.charAt(0)}{member.last_name.charAt(0)}
                            </div>
                            {member.first_name} {member.last_name}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full uppercase",
                            member.label === 'miembro' ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                            member.label === 'asistente_regular' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        )}>
                            {member.label.replace('_', ' ')}
                        </span>
                    </div>
                </div>
            }
        >
            <Head title={`Perfil: ${member.first_name} ${member.last_name}`} />

            <div className="max-w-6xl mx-auto space-y-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Sidebar Izquierdo: Información Personal */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                                Datos de Contacto
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Teléfono Celular</p>
                                        <p className="text-sm text-gray-500">{member.phone || 'No registrado'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Teléfono Fijo</p>
                                        <p className="text-sm text-gray-500">{member.landline || 'No registrado'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</p>
                                        <p className="text-sm text-gray-500">{member.email || 'No registrado'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Dirección</p>
                                        <p className="text-sm text-gray-500">{member.address || 'No registrada'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Miembro desde</p>
                                        <p className="text-sm text-gray-500">{dayjs(member.created_at).format('DD MMMM YYYY')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contenido Principal: Seguimiento Pastoral */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-[600px]">
                            
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-t-xl">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                                    Historial de Seguimiento
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Registra las visitas, llamadas, discipulados o notas importantes sobre esta persona.
                                </p>
                            </div>

                            {/* Área de Comentarios */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900/20">
                                {member.comments && member.comments.length > 0 ? (
                                    member.comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                                                    {comment.user?.name?.charAt(0) || 'U'}
                                                </div>
                                            </div>
                                            <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none p-4 shadow-sm">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                                                        {comment.user?.name || 'Usuario'}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400" title={dayjs(comment.created_at).format('DD/MM/YYYY HH:mm')}>
                                                        {dayjs(comment.created_at).fromNow()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                                                    {comment.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                        <MessageSquare className="h-12 w-12 mb-3 text-gray-300 dark:text-gray-600" />
                                        <p>No hay registros de seguimiento aún.</p>
                                    </div>
                                )}
                            </div>

                            {/* Formulario de Nuevo Comentario */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
                                <form onSubmit={submitComment} className="flex gap-3 items-end">
                                    <div className="flex-1">
                                        <textarea
                                            className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-lg shadow-sm text-sm resize-none"
                                            rows="2"
                                            placeholder="Escribe una nota de seguimiento pastoral..."
                                            value={data.comment}
                                            onChange={(e) => setData('comment', e.target.value)}
                                            required
                                        ></textarea>
                                        <InputError message={errors.comment} className="mt-1" />
                                    </div>
                                    <PrimaryButton disabled={processing || !data.comment.trim()} className="h-[52px] mb-[2px]">
                                        <Send className="h-4 w-4" />
                                    </PrimaryButton>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
