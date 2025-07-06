import type { TableQueryParams } from '~/components/table/types'

export function buildQueryParams({
    page,
    perPage,
    sort,
    search,
    ...rest
}: TableQueryParams & Record<string, unknown>): URLSearchParams {
    const params = new URLSearchParams()

    params.set('page', String(page))
    params.set('per_page', String(perPage))

    if (sort) {
        params.set('sort', `${sort.column}:${sort.direction}`)
    }

    if (search) {
        params.set('search', String(search))
    }

    for (const [key, value] of Object.entries(rest)) {
        if (value != null) {
            params.set(key, String(value))
        }
    }

    return params
}
