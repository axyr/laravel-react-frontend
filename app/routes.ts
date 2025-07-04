import { type RouteConfig, index, route, layout } from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),

    layout('layouts/guest-layout.tsx', [
        route('auth/login', 'routes/auth/login.tsx'),
        route('auth/register', 'routes/auth/register.tsx'),
        route('auth/forgot-password', 'routes/auth/forgot-password.tsx'),
        route('auth/reset-password/:token', 'routes/auth/reset-password.tsx'),
    ]),

    layout('layouts/authenticated-layout.tsx', [
        route('dashboard', 'routes/dashboard.tsx'),
        route('settings/profile', 'routes/settings/profile.tsx'),
        route('settings/password', 'routes/settings/password.tsx'),
        route('settings/appearance', 'routes/settings/appearance.tsx'),
    ])

] satisfies RouteConfig