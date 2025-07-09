import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useEffect } from "react"
import { auth } from "~/routes/auth/auth"
import { useAuthStore } from "~/core/stores/auth-store"
import type { Route } from "./+types/root"
import "./app.css"
import { initializeTheme } from '~/core/hooks/use-appearance'
import { Toaster } from 'sonner'

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      {children}
      <ScrollRestoration />
      <Toaster position="top-right" closeButton />
      <Scripts />
      </body>
      </html>
  );
}

export default function App() {
  const { initialized, setUser , setInitialized} = useAuthStore()

  initializeTheme();

  useEffect(() => {
    if (initialized) return

    auth
        .getCsrfToken()
        .then(() => auth.getUser())
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setInitialized(true))
  }, [initialized])

  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
        error.status === 404
            ? "The requested page could not be found."
            : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
      <main className="pt-16 p-4 container mx-auto">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
            <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
        )}
      </main>
  );
}