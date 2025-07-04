import AppLayoutTemplate from '~/layouts/app/app-header-layout'
import { useAuthStore } from '~/stores/auth-store'
import { Navigate, useLocation } from 'react-router'
import type { ReactNode } from 'react'
import type { BreadcrumbItem } from '~/types'

interface AppLayoutProps {
    children: ReactNode
    breadcrumbs?: BreadcrumbItem[]
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const user = useAuthStore((s) => s.user)
    const location = useLocation()

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />
    }

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    )
}