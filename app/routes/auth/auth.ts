import { api } from '~/core/axios/axios';
import { unwrapData, unwrapRoot } from '~/core/lib/utils'
import { END_POINTS } from '~/config/end-points'
import type { User } from '~/core/types';
import type {
    ForgotPasswordFields,
    LoginFields,
    LoginResponse,
    RegisterFields,
    ResetPasswordFields,
    MessageResponse
} from './types';

const getCsrfToken = () => api.get(END_POINTS.AUTH_CSRF);

const logout = () => api.post(END_POINTS.AUTH_LOGOUT);

const getUser = (): Promise<User> =>
    unwrapData<User>(api.get<{ data: User }>(END_POINTS.AUTH_GET_USER));

const login = (payload: LoginFields): Promise<LoginResponse> =>
    unwrapData<LoginResponse>(api.post<{ data: LoginResponse }>(END_POINTS.AUTH_LOGIN, payload))

const register = (payload: RegisterFields): Promise<LoginResponse> =>
    unwrapData<LoginResponse>(api.post<{ data: LoginResponse }>(END_POINTS.AUTH_REGISTER, payload))

const sendPasswordResetLink = (payload: ForgotPasswordFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.post<MessageResponse>(END_POINTS.AUTH_FORGOT_PASSWORD, payload))

const resetPassword = (payload: ResetPasswordFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.post<MessageResponse>(END_POINTS.AUTH_RESET_PASSWORD, payload))

export const auth = {
    getCsrfToken,
    login,
    register,
    sendPasswordResetLink,
    resetPassword,
    logout,
    getUser,
};