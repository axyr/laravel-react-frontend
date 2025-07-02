import AuthLayoutTemplate from '~/layouts/auth/auth-split-layout'
import { useAuthStore } from '~/stores/auth-store'
import { Navigate, useLocation } from 'react-router'

export default function AuthLayout({
    title,
    description,
    children,
}: {
    title: string
    description: string
    children: React.ReactNode
}) {
    const user = useAuthStore((s) => s.user)
    const location = useLocation()

    if (user) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />
    }

    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    )
}