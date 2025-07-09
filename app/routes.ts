import { type RouteConfig, index, route, layout } from '@react-router/dev/routes'
import { authRoutes } from './routes/auth/routes'
import { userRoutes } from './routes/users/routes'
import { errorRoutes } from './routes/errors/routes'
import { settingsRoutes } from './routes/settings/routes'

export default [
    index('routes/home.tsx'),

    ...errorRoutes,

    layout('core/layouts/guest-layout.tsx', authRoutes),
    layout('core/layouts/authenticated-layout.tsx', [
        route('dashboard', './routes/dashboard.tsx'),
        ...settingsRoutes,
        ...userRoutes,
    ])
] satisfies RouteConfig