import { useCallback } from 'react'
import { useAuthStore } from '~/core/stores/auth-store'
import { auth } from '~/routes/auth/auth'
import { useNavigate } from 'react-router'

export function useLogout() {
    const setUser = useAuthStore(s => s.setUser)
    const navigate = useNavigate()

    return useCallback(() => {
        auth.logout()
            .then(() => {
                setUser(null)
                navigate('/auth/login', {replace: true})
            })
    }, [])
}