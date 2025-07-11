import { useEffect, useState, useRef } from 'react'
import type {
    Search,
    Sort,
    TableQueryParams,
    TableState,
    TableActions,
} from './types'

export function useTableData<T>(
    fetchFn: (params: TableQueryParams) => Promise<{ data: T[]; total: number }>,
    initialPerPage = 15
): {
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
    totalCount: number
    tableState: TableState
    tableActions: TableActions
} {
    const [data, setData] = useState<T[]>([])
    const [totalCount, setTotalCount] = useState(0)

    const [page, setPage] = useState(1)
    const [perPage, setPerPageRaw] = useState(initialPerPage)
    const [sort, setSortRaw] = useState<Sort | null>(null)
    const [search, setSearchRaw] = useState<Search>(null)

    const prevParams = useRef<string>('')

    const resetPageIfChanged = <TVal>(prev: TVal, next: TVal, setter: (val: TVal) => void) => {
        const changed = JSON.stringify(prev) !== JSON.stringify(next)
        if (changed) setPage(1)
        setter(next)
    }

    const setSort = (value: Sort | null) => setSortRaw((prev) => {
        resetPageIfChanged(prev, value, () => value)
        return value
    })

    const setSearch = (value: Search) => setSearchRaw((prev) => {
        resetPageIfChanged(prev, value, () => value)
        return value
    })

    const setPerPage = (value: number) => setPerPageRaw((prev) => {
        resetPageIfChanged(prev, value, () => value)
        return value
    })

    useEffect(() => {
        const key = JSON.stringify({ page, perPage, sort, search })
        if (key === prevParams.current) return
        prevParams.current = key

        fetchFn({ page, perPage, sort, search }).then((res) => {
            setData(res.data)
            setTotalCount(res.total)
        })
    }, [page, perPage, sort, search, fetchFn])

    return {
        data,
        setData,
        totalCount,
        tableState: { page, perPage, sort, search },
        tableActions: {
            onPageChange: setPage,
            onPerPageChange: setPerPage,
            onSortChange: setSort,
            onSearchChange: setSearch,
        },
    }
}