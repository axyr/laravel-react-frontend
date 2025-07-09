import AuthLayoutTemplate from '~/core/layouts/auth/auth-split-layout'

export default function AuthLayout({
    title,
    description,
    children,
}: {
    title: string
    description: string
    children: React.ReactNode
}) {
    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    )
}