import { type RouteConfig, index, route, prefix } from '@react-router/dev/routes'

export default [
    index('routes/home.tsx'),

    ...prefix('auth', [
        route('login', 'routes/auth/login.tsx'),
        route('register', 'routes/auth/register.tsx'),
        route('forgot-password', 'routes/auth/forgot-password.tsx'),
        route('reset-password/:token', 'routes/auth/reset-password.tsx'),
    ]),
    //http://localhost:5173/auth/reset-password/693be312b3c36569ac53ac1814fad1411da1ed679d601c99295d049ac8f75421?email=info@axyrmedia.nl
    route('dashboard', 'routes/dashboard.tsx'),
    // route('settings', 'routes/settings.tsx'),

] satisfies RouteConfig