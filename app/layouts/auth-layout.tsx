import { useAuthStore } from '~/stores/auth-store'
import { Navigate, Outlet, useLocation } from 'react-router'

export default function () {
    const user = useAuthStore((s) => s.user)
    const location = useLocation()

    if (user) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Outlet />
        </div>
    )
}