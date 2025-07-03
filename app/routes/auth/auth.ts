import { api } from '~/axios/axios';
import type { User } from '~/types'
import type { ForgotPasswordFields, LoginFields, LoginResponse, RegisterFields, ResetPasswordFields } from './types'

async function getCsrfToken(): Promise<void> {
    await api.get('cookie')
}

async function login(payload: LoginFields): Promise<LoginResponse> {
    const { data } = await api.post<{ data: LoginResponse }>('login', payload)
    return data.data
}

async function register(payload: RegisterFields): Promise<LoginResponse> {
    const { data } = await api.post<{ data: LoginResponse }>('register', payload)
    return data.data
}

async function sendPasswordResetLink(payload: ForgotPasswordFields): Promise<any> {
    const { data } = await api.post<{ data: any }>('forgot-password', payload)
    return data.data
}

async function resetPassword(payload: ResetPasswordFields): Promise<any> {
    const { data } = await api.post<{ data: any }>('reset-password', payload)
    return data.data
}

async function logout(): Promise<void> {
    await api.post('logout')
}

async function getUser(): Promise<User> {
    const { data } = await api.get<{ data: User }>('user')
    return data.data
}

export const auth = {
    login,
    logout,
    getUser,
    register,
    getCsrfToken,
    resetPassword,
    sendPasswordResetLink,
}