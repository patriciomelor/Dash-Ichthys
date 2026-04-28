import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import {
    LayoutDashboard,
    Users,
    Menu,
    X,
    Building,
    ClipboardList,
    Settings,
    LogOut,
    User as UserIcon,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, globalSettings } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const primaryColor = globalSettings?.primary_color || '#4f46e5';
    const secondaryColor = globalSettings?.secondary_color || '#db2777';
    const churchName = globalSettings?.church_name || 'Dash-Ichthys';
    const logoPath = globalSettings?.logo_path;

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard') },
        { name: 'Miembros', href: '/members', icon: Users, active: route().current('members.*') || window.location.pathname.startsWith('/members') },
        { name: 'Formularios', href: '/forms', icon: ClipboardList, active: route().current('forms.*') || window.location.pathname.startsWith('/forms') },
        { name: 'Ministerios', href: '/ministries', icon: Building, active: route().current('ministries.*') || window.location.pathname.startsWith('/ministries') },
        { name: 'Usuarios', href: '/users', icon: ShieldCheck, active: route().current('users.*') || window.location.pathname.startsWith('/users') },
        { name: 'Configuración', href: '/settings', icon: Settings, active: route().current('settings.*') || window.location.pathname.startsWith('/settings') },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Inject Global Styles for Primary Color Overrides */}
            <style dangerouslySetInnerHTML={{__html: `
                :root {
                    --primary-color: ${primaryColor};
                    --secondary-color: ${secondaryColor};
                }
                .btn-primary {
                    background-color: var(--primary-color) !important;
                }
                .btn-primary:hover {
                    opacity: 0.9 !important;
                }
                .text-primary {
                    color: var(--primary-color) !important;
                }
                .bg-primary {
                    background-color: var(--primary-color) !important;
                }
            `}} />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="flex h-16 items-center px-6 border-b border-gray-100 dark:border-gray-700">
                        <Link href="/" className="flex items-center gap-3 overflow-hidden">
                            {logoPath ? (
                                <img src={logoPath} alt={churchName} className="h-8 w-8 object-contain flex-shrink-0" />
                            ) : (
                                <ApplicationLogo className="h-8 w-8 flex-shrink-0" style={{ color: primaryColor }} />
                            )}
                            <span 
                                className="text-xl font-bold bg-clip-text text-transparent truncate"
                                style={{ backgroundImage: `linear-gradient(to right, var(--primary-color), var(--secondary-color))` }}
                            >
                                {churchName}
                            </span>
                        </Link>
                        <button
                            className="ml-auto lg:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    style={item.active ? { backgroundColor: `${primaryColor}20`, color: primaryColor } : {}}
                                    className={cn(
                                        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                                        !item.active && "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
                                    )}
                                >
                                    <Icon 
                                        className={cn(
                                            "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                            !item.active && "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                        )} 
                                        style={item.active ? { color: primaryColor } : {}}
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                        <div className="flex items-center gap-3 lg:hidden">
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            {logoPath ? (
                                <img src={logoPath} alt={churchName} className="h-8 w-auto object-contain flex-shrink-0" />
                            ) : (
                                <ApplicationLogo className="h-8 w-auto flex-shrink-0" style={{ color: primaryColor }} />
                            )}
                        </div>

                        {/* Spacer for desktop to push user to the right */}
                        <div className="hidden lg:block flex-1"></div>

                        <div className="flex items-center gap-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1.5 rounded-lg transition-colors text-left">
                                        <div 
                                            className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                                        >
                                            <span className="font-medium text-sm">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="hidden md:block min-w-0 mr-2">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                                                {user.name}
                                            </p>
                                        </div>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right">
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700">
                                        <div>{user.name}</div>
                                        <div className="font-medium truncate text-gray-500 dark:text-gray-400">{user.email}</div>
                                    </div>
                                    <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                        <UserIcon className="h-4 w-4" />
                                        <span>Mi Perfil</span>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                        <LogOut className="h-4 w-4" />
                                        <span>Cerrar Sesión</span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {header && (
                        <div className="mb-6">
                            {header}
                        </div>
                    )}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
