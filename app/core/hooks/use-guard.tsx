import { useAuthStore } from '~/core/stores/auth-store'

export function useGuard() {
    const user = useAuthStore((s) => s.user)
    const initialized = useAuthStore((s) => s.initialized)

    const isAuthenticated = !!user
    const isLoading = !initialized
    const isGuest = initialized && !user

    return {
        user,
        initialized,
        isAuthenticated,
        isGuest,
        isLoading,
    }
}