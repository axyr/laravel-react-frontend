import { route } from '@react-router/dev/routes'

export const errorRoutes = [
    route('403', './routes/errors/403.tsx'),
    route('500', './routes/errors/500.tsx'),
]
