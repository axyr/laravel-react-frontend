import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home.tsx"),

    route("auth", "layouts/auth-layout.tsx", [
        route("login", "routes/auth/login.tsx"),
        // route("register", "routes/auth/register.tsx"),
    ]),

    route("", "layouts/app-layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        // route("settings", "routes/settings.tsx"),
    ]),
] satisfies RouteConfig