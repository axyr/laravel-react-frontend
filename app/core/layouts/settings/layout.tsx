import Heading from '~/components/heading';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { cn } from "~/lib/utils"
import { type NavItem } from '~/core/types';
import { type PropsWithChildren } from 'react';
import { Link } from 'react-router'

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        to: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        to: '/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        to: '/settings/appearance',
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.to}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.to,
                                })}
                            >
                                <Link to={item.to}>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}