import AppLayoutTemplate from '~/layouts/app/app-sidebar-layout'
import type { ReactNode } from 'react'
import type { BreadcrumbItem } from '~/types'

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