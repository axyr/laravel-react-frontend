import AppLayoutTemplate from '~/layouts/app/app-sidebar-layout';
import { useAuthStore } from '~/stores/auth-store'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useBreadcrumbs } from "~/components/breadcrumb-context";

export default function () {
    const breadcrumbs = useBreadcrumbs();
    const user = useAuthStore((s) => s.user)
    const location = useLocation()

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />
    }

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <Outlet />
        </AppLayoutTemplate>
    )
}