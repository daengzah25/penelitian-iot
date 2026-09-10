import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Cpu,
    LayoutDashboard,
    LogOut,
    PawPrint,
    UserCircle2,
} from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const isDashboardActive = route().current('dashboard');
    const isAnimalsActive = [
        'animals.index',
        'animals.create',
        'animals.show',
        'animals.edit',
    ].some((name) => route().current(name));
    const isDevicesActive = [
        'iot-devices.index',
        'iot-devices.create',
        'iot-devices.show',
        'iot-devices.edit',
    ].some((name) => route().current(name));
    const isProfileActive = route().current('profile.edit');

    const navItems = [
        {
            href: route('dashboard'),
            label: 'Dashboard',
            active: isDashboardActive,
            icon: LayoutDashboard,
        },
        {
            href: route('animals.index'),
            label: 'Data Hewan',
            active: isAnimalsActive,
            icon: PawPrint,
        },
        {
            href: route('iot-devices.index'),
            label: 'Alat IoT',
            active: isDevicesActive,
            icon: Cpu,
        },
    ];

    const mobileNavItems = [
        ...navItems,
        {
            href: route('profile.edit'),
            label: 'Profile',
            active: isProfileActive,
            icon: UserCircle2,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
            <nav className="sticky top-0 z-40 border-b border-sky-100 bg-white/85 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
                        <div className="flex min-w-0 items-center gap-4">
                            <Link href={route('dashboard')} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm shadow-sky-200">
                                    <PawPrint className="h-5 w-5" />
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-sm font-semibold tracking-[0.18em] text-sky-700 uppercase">
                                        Pternak
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        Monitoring ternak
                                    </div>
                                </div>
                            </Link>

                            <div className="hidden items-center gap-1 md:flex">
                                {navItems.map(({ href, label, active, icon: Icon }) => (
                                    <NavLink
                                        key={label}
                                        href={href}
                                        active={active}
                                        className="px-3 py-2.5 text-sm"
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden items-center gap-3 md:flex">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                        {user.name}
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <span className="inline-flex items-center gap-2">
                                            <LogOut className="h-4 w-4" />
                                            Log Out
                                        </span>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                    </div>
                </div>
            </nav>

            <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden" aria-label="Navigasi mobile">
                <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
                    {mobileNavItems.map(({ href, label, active, icon: Icon }) => (
                        <Link
                            key={label}
                            href={href}
                            aria-current={active ? 'page' : undefined}
                            className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-medium transition ${active ? 'bg-sky-50 text-sky-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {header && (
                <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="min-h-[calc(100vh-5rem)] bg-slate-100 pb-24 md:pb-0">{children}</main>
        </div>
    );
}
