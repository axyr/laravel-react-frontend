import { Navigate, Outlet } from 'react-router'
import { useGuard } from '~/core/hooks/use-guard'

export default function GuestLayout() {
    const { isLoading, isAuthenticated } = useGuard()

    if (isLoading) return null
    if (isAuthenticated) return <Navigate to="/dashboard" replace />

    return <Outlet />
}