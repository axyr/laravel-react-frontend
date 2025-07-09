import AppLayoutTemplate from '~/core/layouts/app/app-sidebar-layout'
import type { ReactNode } from 'react'
import type { BreadcrumbItem } from '~/core/types'

interface AppLayoutProps {
    children: ReactNode
    breadcrumbs?: BreadcrumbItem[]
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    )
}