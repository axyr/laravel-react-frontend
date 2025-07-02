import { api } from '~/axios/axios';
import type { User } from '~/types'
import type { LoginPayload } from './types';

async function getCsrfToken(): Promise<void> {
    await api.get('cookie')
}

async function login(payload: LoginPayload): Promise<User> {
    const { data } = await api.post<{ data: User }>('login', payload)
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
    getCsrfToken,
}