import { api } from '~/axios/axios';
import { unwrapData, unwrapRoot } from '~/lib/utils'

import type { User } from '~/types';
import type {
    ForgotPasswordFields,
    LoginFields,
    LoginResponse,
    RegisterFields,
    ResetPasswordFields,
    MessageResponse
} from './types';

const getCsrfToken = () => api.get('cookie');

const logout = () => api.post('logout');

const getUser = (): Promise<User> =>
    unwrapData<User>(api.get<{ data: User }>('user'));

const login = (payload: LoginFields): Promise<LoginResponse> =>
    unwrapData<LoginResponse>(api.post<{ data: LoginResponse }>('login', payload))

const register = (payload: RegisterFields): Promise<LoginResponse> =>
    unwrapData<LoginResponse>(api.post<{ data: LoginResponse }>('register', payload))

const sendPasswordResetLink = (payload: ForgotPasswordFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.post<MessageResponse>('forgot-password', payload))

const resetPassword = (payload: ResetPasswordFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.post<MessageResponse>('reset-password', payload))

export const auth = {
    getCsrfToken,
    login,
    register,
    sendPasswordResetLink,
    resetPassword,
    logout,
    getUser,
};