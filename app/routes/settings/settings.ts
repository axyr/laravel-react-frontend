import { api } from '~/axios/axios'
import { unwrapData, unwrapRoot } from '~/lib/utils'
import type { LoginResponse, MessageResponse } from '~/routes/auth/types'
import type { DeleteUserFields, ProfileFields, UpdatePasswordFields } from './types'

const updateProfile = (payload: ProfileFields): Promise<LoginResponse> =>
    unwrapData<LoginResponse>(api.put<{ data: LoginResponse }>('user/profile-information', payload))

const deleteProfile = (payload: DeleteUserFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.delete<MessageResponse>('user', { data: payload }))

const updatePassword = (payload: UpdatePasswordFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.put<MessageResponse>('user/password', payload))

export const settings = {
    updateProfile,
    deleteProfile,
    updatePassword,
}