import { type RouteConfig, index, route, prefix } from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),

    ...prefix('auth', [
        route('login', 'routes/auth/login.tsx'),
        //route('register', 'routes/auth/register.tsx'),
    ]),

    route('dashboard', 'routes/dashboard.tsx'),
    // route('settings', 'routes/settings.tsx'),

] satisfies RouteConfig