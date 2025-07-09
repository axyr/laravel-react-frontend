import { api } from '~/core/axios/axios'
import { unwrapData, unwrapRoot } from '~/core/lib/utils'
import { END_POINTS } from '~/config/end-points'
import type { LoginResponse, MessageResponse } from '~/routes/auth/types'
import type { DeleteUserFields, ProfileFields, UpdatePasswordFields } from './types'

const updateProfile = (payload: ProfileFields): Promise<LoginResponse> =>
    unwrapData<LoginResponse>(api.put<{ data: LoginResponse }>(END_POINTS.SETTINGS_UPDATE_PROFILE_INFORMATION, payload))

const updatePassword = (payload: UpdatePasswordFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.put<MessageResponse>(END_POINTS.SETTINGS_UPDATE_PASSWORD, payload))

const deleteProfile = (payload: DeleteUserFields): Promise<MessageResponse> =>
    unwrapRoot<MessageResponse>(api.delete<MessageResponse>(END_POINTS.SETTINGS_DELETE_USER, { data: payload }))

export const settings = {
    updateProfile,
    deleteProfile,
    updatePassword,
}