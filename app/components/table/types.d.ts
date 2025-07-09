import type { ColumnDef } from '@tanstack/react-table'

export type Search = string | null

export type Sort = {
    column: string
    direction: 'asc' | 'desc'
}

export type TableQueryParams = {
    page: number
    perPage: number
    sort: Sort | null
    search: Search
    [key: string]: unknown
}

export type TableState = {
    page: number
    perPage: number
    sort: Sort | null
    search: Search
}

export type TableActions = {
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onSortChange: (sort: Sort | null) => void
    onSearchChange: (search: Search) => void
    onCreate?: () => void
}

export type BatchAction<T> = {
    label: string,
    onClick: (selectedRows: T[]) => void
}

export type TableProps<T> = {
    data: T[]
    columns: ColumnDef<T>[]
    totalCount: number
    page: number
    perPage: number
    sort: Sort | null
    search: Search
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onSortChange: (sort: Sort | null) => void
    onSearchChange: (search: Search) => void
    searchPlaceholder?: string
    rowsPerPageOptions?: number[]
    searchDebounce?: number
    emptyMessage?: string
    perPageLabel?: string
    previousLabel?: string
    nextLabel?: string
}
