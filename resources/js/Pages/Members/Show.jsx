import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    User,
    ArrowLeft,
    Phone,
    Mail,
    MapPin,
    Calendar,
    MessageSquare,
    Send,
    Edit,
    X,
    Heart,
    BookOpen,
    Shield
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import Checkbox from '@/Components/Checkbox';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { cn } from '@/lib/utils';

try {
    dayjs.extend(relativeTime.default || relativeTime);
    import('dayjs/locale/es').then(() => {
        dayjs.locale('es');
    }).catch(e => console.error('Error loading locale', e));
} catch (e) {
    console.error('Error extending dayjs', e);
}

export default function Show({ auth, member }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Comment Form
    const { data: commentData, setData: setCommentData, post: postComment, processing: processingComment, errors: commentErrors, reset: resetComment } = useForm({
        comment: ''
    });

    const submitComment = (e) => {
        e.preventDefault();
        postComment(route('members.comments.add', member.id), {
            preserveScroll: true,
            onSuccess: () => resetComment('comment')
        });
    };

    // Edit Profile Form
    const { data, setData, put, processing, errors, reset } = useForm({
        first_name: member.first_name || '',
        last_name: member.last_name || '',
        email: member.email || '',
        phone: member.phone || '',
        landline: member.landline || '',
        address: member.address || '',
        labels: member.labels ? member.labels.join(', ') : 'miembro',
        is_active: member.is_active !== undefined ? member.is_active : true,
        is_deceased: member.is_deceased || false,
        birth_date: member.birth_date ? member.birth_date.substring(0,10) : '',
        conversion_date: member.conversion_date ? member.conversion_date.substring(0,10) : '',
        baptism_date: member.baptism_date ? member.baptism_date.substring(0,10) : '',
        class_connect_1_date: member.class_connect_1_date ? member.class_connect_1_date.substring(0,10) : '',
        class_grow_2_date: member.class_grow_2_date ? member.class_grow_2_date.substring(0,10) : '',
        class_equip_date: member.class_equip_date ? member.class_equip_date.substring(0,10) : '',
        marriage_date: member.marriage_date ? member.marriage_date.substring(0,10) : '',
        membership_date: member.membership_date ? member.membership_date.substring(0,10) : '',
        membership_cessation_date: member.membership_cessation_date ? member.membership_cessation_date.substring(0,10) : '',
        reinstatement_date: member.reinstatement_date ? member.reinstatement_date.substring(0,10) : '',
        death_date: member.death_date ? member.death_date.substring(0,10) : '',
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        put(route('members.update', member.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                router.reload();
            }
        });
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        reset();
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'No registrada';
        return dayjs(dateStr).format('DD MMMM YYYY');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href="/members" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </Link>
                    <div className="flex-1 flex items-center gap-3">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm">
                                {String(member.first_name || '').charAt(0)}{String(member.last_name || '').charAt(0)}
                            </div>
                            {member.first_name} {member.last_name}
                            {member.is_deceased && <span className="text-sm font-normal text-gray-500">(Fallecido)</span>}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        {member.labels && member.labels.length > 0 ? (
                            member.labels.map((lbl, idx) => (
                                <span key={idx} className={cn(
                                    "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full uppercase",
                                    lbl === 'miembro' ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                                    lbl === 'asistente_regular' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                )}>
                                    {lbl.replace('_', ' ')}
                                </span>
                            ))
                        ) : (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 uppercase">
                                SIN ETIQUETA
                            </span>
                        )}
                        
                        <PrimaryButton onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 ml-2">
                            <Edit className="h-4 w-4" />
                            Editar Perfil
                        </PrimaryButton>
                    </div>
                </div>
            }
        >
            <Head title={`Perfil: ${member.first_name} ${member.last_name}`} />

            <div className="max-w-7xl mx-auto space-y-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Sidebar Izquierdo: Información del Miembro */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Datos de Contacto */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                                Contacto y Residencia
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Celular</p>
                                        <p className="text-sm text-gray-500">{member.phone || 'No registrado'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Fijo</p>
                                        <p className="text-sm text-gray-500">{member.landline || 'No registrado'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Correo</p>
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
                            </div>
                        </div>

                        {/* Fechas Importantes */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                                Fechas Importantes
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-sm text-gray-500">Nacimiento</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(member.birth_date)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-sm text-gray-500">Conversión</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(member.conversion_date)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-sm text-gray-500">Bautismo</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(member.baptism_date)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-sm text-gray-500">Matrimonio</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(member.marriage_date)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Membresía</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(member.membership_date)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Clases Tomadas */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                                Progreso de Clases
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-3 w-3 rounded-full", member.class_connect_1_date ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600")}></div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Conectar 1</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{member.class_connect_1_date ? dayjs(member.class_connect_1_date).format('MM/YYYY') : 'Pendiente'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-3 w-3 rounded-full", member.class_grow_2_date ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600")}></div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Crecer 2</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{member.class_grow_2_date ? dayjs(member.class_grow_2_date).format('MM/YYYY') : 'Pendiente'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-3 w-3 rounded-full", member.class_equip_date ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600")}></div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Capacitar</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{member.class_equip_date ? dayjs(member.class_equip_date).format('MM/YYYY') : 'Pendiente'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Defunción */}
                        {member.is_deceased && (
                            <div className="bg-red-50 dark:bg-red-900/20 shadow-sm rounded-xl border border-red-200 dark:border-red-800 p-6">
                                <h3 className="text-lg font-medium text-red-900 dark:text-red-400 mb-2 border-b border-red-200 dark:border-red-800 pb-2">
                                    En Memoria
                                </h3>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm text-red-700 dark:text-red-500">Fecha de Defunción</span>
                                    <span className="text-sm font-bold text-red-900 dark:text-red-400">{formatDate(member.death_date)}</span>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Contenido Principal: Seguimiento Pastoral */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-[750px]">
                            
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
                                                    {String(comment.user?.name || 'U').charAt(0)}
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
                                            rows="3"
                                            placeholder="Escribe una nota de seguimiento pastoral..."
                                            value={commentData.comment}
                                            onChange={(e) => setCommentData('comment', e.target.value)}
                                            required
                                        ></textarea>
                                        <InputError message={commentErrors.comment} className="mt-1" />
                                    </div>
                                    <PrimaryButton disabled={processingComment || !commentData.comment.trim()} className="h-[74px] mb-[2px]">
                                        <Send className="h-4 w-4" />
                                    </PrimaryButton>
                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Modal de Edición */}
            <Modal show={isEditModalOpen} onClose={closeEditModal} maxWidth="3xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Editar Perfil del Miembro
                        </h2>
                        <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-500 transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleEditSubmit} className="space-y-8 max-h-[70vh] overflow-y-auto px-1 pb-4">
                        
                        {/* Datos Básicos */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Información Básica</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="first_name" value="Nombres" />
                                    <TextInput id="first_name" className="mt-1 block w-full" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} required />
                                    <InputError message={errors.first_name} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="last_name" value="Apellidos" />
                                    <TextInput id="last_name" className="mt-1 block w-full" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} required />
                                    <InputError message={errors.last_name} className="mt-1" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                                    <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="phone" value="Teléfono Celular" />
                                    <TextInput id="phone" className="mt-1 block w-full" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="landline" value="Teléfono Fijo" />
                                    <TextInput id="landline" className="mt-1 block w-full" value={data.landline} onChange={(e) => setData('landline', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="address" value="Dirección" />
                                    <TextInput id="address" className="mt-1 block w-full" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Clasificación */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Clasificación en Iglesia</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="labels" value="Etiquetas (Separadas por coma)" />
                                    <TextInput 
                                        id="labels" 
                                        className="mt-1 block w-full" 
                                        value={data.labels} 
                                        onChange={(e) => setData('labels', e.target.value)} 
                                        placeholder="Ej: miembro, lider, servidor"
                                        required 
                                    />
                                </div>
                                <div className="flex items-center mt-6">
                                    <label className="flex items-center">
                                        <Checkbox checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">¿Asiste Actualmente? (Activo)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Fechas Generales */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Fechas Generales</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <InputLabel htmlFor="birth_date" value="Nacimiento" />
                                    <TextInput id="birth_date" type="date" className="mt-1 block w-full" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="conversion_date" value="Conversión" />
                                    <TextInput id="conversion_date" type="date" className="mt-1 block w-full" value={data.conversion_date} onChange={(e) => setData('conversion_date', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="baptism_date" value="Bautismo" />
                                    <TextInput id="baptism_date" type="date" className="mt-1 block w-full" value={data.baptism_date} onChange={(e) => setData('baptism_date', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="marriage_date" value="Matrimonio" />
                                    <TextInput id="marriage_date" type="date" className="mt-1 block w-full" value={data.marriage_date} onChange={(e) => setData('marriage_date', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Fechas de Clases */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Clases de Crecimiento (Fecha Completada)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <InputLabel htmlFor="class_connect_1_date" value="Conectar 1" />
                                    <TextInput id="class_connect_1_date" type="date" className="mt-1 block w-full" value={data.class_connect_1_date} onChange={(e) => setData('class_connect_1_date', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="class_grow_2_date" value="Crecer 2" />
                                    <TextInput id="class_grow_2_date" type="date" className="mt-1 block w-full" value={data.class_grow_2_date} onChange={(e) => setData('class_grow_2_date', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="class_equip_date" value="Capacitar" />
                                    <TextInput id="class_equip_date" type="date" className="mt-1 block w-full" value={data.class_equip_date} onChange={(e) => setData('class_equip_date', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Membresía Avanzada */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Gestión de Membresía</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <InputLabel htmlFor="membership_date" value="Fecha de Integración" />
                                    <TextInput id="membership_date" type="date" className="mt-1 block w-full" value={data.membership_date} onChange={(e) => setData('membership_date', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="membership_cessation_date" value="Fecha de Cese" />
                                    <TextInput id="membership_cessation_date" type="date" className="mt-1 block w-full" value={data.membership_cessation_date} onChange={(e) => setData('membership_cessation_date', e.target.value)} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="reinstatement_date" value="Fecha de Reinserción" />
                                    <TextInput id="reinstatement_date" type="date" className="mt-1 block w-full" value={data.reinstatement_date} onChange={(e) => setData('reinstatement_date', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Defunción */}
                        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                            <h3 className="text-lg font-medium text-red-900 dark:text-red-400 mb-4 pb-2 border-b border-red-200 dark:border-red-800/50">Defunción</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <label className="flex items-center">
                                        <Checkbox checked={data.is_deceased} onChange={(e) => setData('is_deceased', e.target.checked)} />
                                        <span className="ml-2 text-sm text-red-800 dark:text-red-400 font-medium">Marcar como fallecido</span>
                                    </label>
                                </div>
                                {data.is_deceased && (
                                    <div>
                                        <InputLabel htmlFor="death_date" value="Fecha de Defunción" className="text-red-800 dark:text-red-400" />
                                        <TextInput id="death_date" type="date" className="mt-1 block w-full border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-red-500" value={data.death_date} onChange={(e) => setData('death_date', e.target.value)} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
                            <SecondaryButton onClick={closeEditModal} type="button">Cancelar</SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                Guardar Cambios
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
