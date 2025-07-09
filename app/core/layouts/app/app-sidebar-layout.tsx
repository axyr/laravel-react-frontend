import { AppContent } from '~/components/app-content';
import { AppShell } from '~/components/app-shell';
import { AppSidebar } from '~/components/app-sidebar';
import { AppSidebarHeader } from '~/components/app-sidebar-header';
import { type PropsWithChildren } from 'react';
import type { BreadcrumbItem } from '~/core/types';
export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}