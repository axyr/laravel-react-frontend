import { Navigate, Outlet, useLocation } from 'react-router'
import { useGuard } from '~/core/hooks/use-guard'

export default function AuthenticatedLayout() {
    const { isLoading, isGuest } = useGuard()
    const location = useLocation()

    if (isLoading) return null
    if (isGuest) return <Navigate to="/auth/login" state={{ from: location }} replace />

    return <Outlet />
}