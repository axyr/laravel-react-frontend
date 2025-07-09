import { route } from '@react-router/dev/routes'

export const userRoutes = [
    route('users/create', './routes/users/user-create.tsx'),
    route('users/:id', './routes/users/user-edit.tsx'),
    route('users', './routes/users/users.tsx'),
]
