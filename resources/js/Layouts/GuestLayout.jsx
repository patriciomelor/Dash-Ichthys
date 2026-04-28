import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { globalSettings } = usePage().props;
    
    const primaryColor = globalSettings?.primary_color || '#4f46e5';
    const secondaryColor = globalSettings?.secondary_color || '#db2777';
    const churchName = globalSettings?.church_name || 'Dash-Ichthys';
    const logoPath = globalSettings?.logo_path;

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
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

            <div>
                <Link href="/" className="flex flex-col items-center gap-4">
                    {logoPath ? (
                        <img src={logoPath} alt={churchName} className="h-24 w-auto object-contain" />
                    ) : (
                        <ApplicationLogo className="h-20 w-20 fill-current" style={{ color: primaryColor }} />
                    )}
                    <h1 
                        className="text-3xl font-bold bg-clip-text text-transparent text-center"
                        style={{ backgroundImage: `linear-gradient(to right, var(--primary-color), var(--secondary-color))` }}
                    >
                        {churchName}
                    </h1>
                </Link>
            </div>

            <div className="mt-8 w-full overflow-hidden bg-white px-6 py-8 shadow-xl sm:max-w-md sm:rounded-2xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                {children}
            </div>
        </div>
    );
}
