import type { User } from './types'
import { unwrapData } from '~/core/lib/utils'
import { api } from '~/core/axios/axios'
import type { TableQueryParams } from '~/components/table/types'
import { buildQueryParams } from '~/components/table/query-params'

export function getUsers(params: TableQueryParams) {
    return api.get('/users', { params: buildQueryParams(params) })
}

export const getUser = (id: number | string): Promise<User> =>
    unwrapData<User>(api.get<{ data: User }>(`users/${id}`))

export const createUser = (payload: User): Promise<User> =>
    unwrapData<User>(api.post<{ data: User }>('users', payload))

export const updateUser = (id: number | string, payload: User): Promise<User> =>
    unwrapData<User>(api.put<{ data: User }>(`users/${id}`, payload))

export const deleteUser = (id: number | string): Promise<User> =>
    unwrapData<User>(api.delete<{ data: User }>(`users/${id}`))