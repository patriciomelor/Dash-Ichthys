import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    UserCheck, 
    UserMinus, 
    Building, 
    Cake, 
    Heart, 
    CalendarDays, 
    Clock, 
    GraduationCap 
} from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { cn } from '@/lib/utils';

dayjs.extend(relativeTime);
dayjs.locale('es');

export default function Dashboard({ ministries, membersStats, classesStats, todayEvents, recentMembers }) {
    
    // Top Cards Data
    const summaryCards = [
        {
            title: 'Total Registrados',
            value: membersStats.total,
            icon: Users,
            color: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-indigo-100 dark:bg-indigo-900/30',
        },
        {
            title: 'Miembros',
            value: membersStats.members,
            icon: UserCheck,
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        },
        {
            title: 'Asistentes',
            value: membersStats.assistants,
            icon: Users,
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            title: 'Cese de Membresía',
            value: membersStats.cessation,
            icon: UserMinus,
            color: 'text-rose-600 dark:text-rose-400',
            bg: 'bg-rose-100 dark:bg-rose-900/30',
        }
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {summaryCards.map((card, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-4">
                                <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center", card.bg, card.color)}>
                                    <card.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Left Column (Wider) */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Clases de Crecimiento */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-indigo-500" />
                                    Progreso de Clases de Crecimiento
                                </h3>
                                
                                <div className="space-y-6">
                                    {/* Clase Conectar */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Clase Conectar</span>
                                            <span className="text-gray-500">{classesStats.connect.completed} Completadas / {classesStats.connect.pending} Pendientes</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(classesStats.connect.completed / membersStats.total) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    {/* Clase Crecer */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Clase Crecer</span>
                                            <span className="text-gray-500">{classesStats.grow.completed} Completadas / {classesStats.grow.pending} Pendientes</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(classesStats.grow.completed / membersStats.total) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    {/* Clase Capacitar */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700 dark:text-gray-300">Clase Capacitar</span>
                                            <span className="text-gray-500">{classesStats.equip.completed} Completadas / {classesStats.equip.pending} Pendientes</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${(classesStats.equip.completed / membersStats.total) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ministerios */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Building className="h-5 w-5 text-indigo-500" />
                                        Ministerios Activos ({ministries.length})
                                    </h3>
                                    <Link href={route('ministries.index')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                        Ver todos
                                    </Link>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {ministries.map(ministry => (
                                        <div key={ministry.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 flex items-center gap-3">
                                            <div 
                                                className="h-10 w-10 rounded-lg flex items-center justify-center bg-opacity-20 flex-shrink-0"
                                                style={{ backgroundColor: `${ministry.color_hex || '#4f46e5'}30`, color: ministry.color_hex || '#4f46e5' }}
                                            >
                                                <Building className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{ministry.name}</p>
                                                <p className="text-xs text-gray-500">{ministry.members_count} integrantes</p>
                                            </div>
                                        </div>
                                    ))}
                                    {ministries.length === 0 && (
                                        <p className="text-sm text-gray-500 col-span-2">No hay ministerios registrados aún.</p>
                                    )}
                                </div>
                            </div>

                            {/* Recent Members */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-indigo-500" />
                                        Miembros Agregados Recientemente
                                    </h3>
                                    <Link href={route('members.index')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                        Ver todos
                                    </Link>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {recentMembers.map(member => (
                                        <div key={member.id} className="py-3 flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                                    {String(member.first_name || '').charAt(0)}{String(member.last_name || '').charAt(0)}
                                                </div>
                                                <Link href={`/members/${member.id}`} className="text-sm font-medium text-gray-900 dark:text-white hover:underline">
                                                    {member.first_name} {member.last_name}
                                                </Link>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {dayjs(member.created_at).fromNow()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Sidebar) */}
                        <div className="space-y-6">
                            
                            {/* Cumpleaños Hoy */}
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                                <Cake className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                        <Cake className="h-5 w-5" />
                                        Cumpleaños de Hoy
                                    </h3>
                                    {todayEvents.birthdays.length > 0 ? (
                                        <ul className="space-y-3">
                                            {todayEvents.birthdays.map(b => (
                                                <li key={b.id} className="flex justify-between items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                                                    <span className="font-medium">{b.first_name} {b.last_name}</span>
                                                    <span className="text-sm font-bold bg-white text-purple-600 px-2 py-0.5 rounded-full">{b.years} años</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-white/80">No hay cumpleaños registrados para hoy.</p>
                                    )}
                                </div>
                            </div>

                            {/* Aniversarios Matrimonio Hoy */}
                            <div className="bg-gradient-to-br from-rose-400 to-red-500 rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                                <Heart className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                        <Heart className="h-5 w-5" />
                                        Aniv. de Matrimonio Hoy
                                    </h3>
                                    {todayEvents.marriageAnniversaries.length > 0 ? (
                                        <ul className="space-y-3">
                                            {todayEvents.marriageAnniversaries.map(a => (
                                                <li key={a.id} className="flex justify-between items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                                                    <span className="font-medium">{a.first_name} {a.last_name}</span>
                                                    <span className="text-sm font-bold bg-white text-rose-500 px-2 py-0.5 rounded-full">{a.years} años</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-white/80">No hay aniversarios de matrimonio hoy.</p>
                                    )}
                                </div>
                            </div>

                            {/* Aniversarios Membresía Hoy */}
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                                <CalendarDays className="absolute -bottom-4 -right-4 h-32 w-32 text-white/10" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                        <CalendarDays className="h-5 w-5" />
                                        Aniv. de Membresía Hoy
                                    </h3>
                                    {todayEvents.membershipAnniversaries.length > 0 ? (
                                        <ul className="space-y-3">
                                            {todayEvents.membershipAnniversaries.map(a => (
                                                <li key={a.id} className="flex justify-between items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                                                    <span className="font-medium">{a.first_name} {a.last_name}</span>
                                                    <span className="text-sm font-bold bg-white text-teal-600 px-2 py-0.5 rounded-full">{a.years} años</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-white/80">No hay aniversarios de membresía hoy.</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
