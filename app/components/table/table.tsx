import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, X } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { useDebounce } from "use-debounce"
import type { BatchAction, TableProps, TableState, TableActions, Search } from '~/components/table/types'


type SimplifiedTableProps<T> = Omit<
    TableProps<T>,
    | 'page'
    | 'perPage'
    | 'sort'
    | 'search'
    | 'onPageChange'
    | 'onPerPageChange'
    | 'onSortChange'
    | 'onSearchChange'
> & {
    tableState: TableState
    tableActions: TableActions
    batchActions?: BatchAction<T>[]
}

export function DataTable<T>({
    data,
    columns,
    totalCount,
    tableState,
    tableActions,
    batchActions = [],
    searchPlaceholder = "Search...",
    rowsPerPageOptions = [15, 25, 50, 100],
    searchDebounce = 300,
    emptyMessage = "No results.",
    perPageLabel = "Rows per page",
    previousLabel = "Previous",
    nextLabel = "Next",
}: SimplifiedTableProps<T>) {
    const {
        page,
        perPage,
        sort,
        search,
    } = tableState

    const {
        onPageChange,
        onPerPageChange,
        onSortChange,
        onSearchChange,
    } = tableActions

    const [inputValue, setInputValue] = React.useState(search ?? '')
    const [debouncedValue] = useDebounce(inputValue, searchDebounce)
    const [confirmAction, setConfirmAction] = React.useState<null | (() => void)>(null)

    React.useEffect(() => {
        setInputValue(search ?? '')
    }, [search])

    React.useEffect(() => {
        if (debouncedValue !== search) {
            onSearchChange(debouncedValue as Search)
        }
    }, [debouncedValue, search, onSearchChange])

    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        manualSorting: true,
        enableRowSelection: true,
        pageCount: Math.ceil(totalCount / perPage),
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize: perPage,
            },
            sorting: sort
                ? [{ id: sort.column, desc: sort.direction === "desc" }]
                : [],
        },
        onSortingChange: (updater) => {
            const resolved =
                typeof updater === "function"
                    ? updater(table.getState().sorting)
                    : updater

            const update = resolved[0]
            if (update) {
                onSortChange({
                    column: update.id,
                    direction: update.desc ? "desc" : "asc",
                })
            } else {
                onSortChange(null)
            }
        },
        onPaginationChange: (updater) => {
            const newPageIndex =
                typeof updater === "function"
                    ? updater({ pageIndex: page - 1, pageSize: perPage }).pageIndex
                    : updater.pageIndex
            onPageChange(newPageIndex + 1)
        },
        getCoreRowModel: getCoreRowModel(),
    })

    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)

    return (
        <div className="w-full px-4">
            <div className="flex items-center py-4 gap-2">
                {selectedRows.length > 0 && batchActions.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                Actions <ChevronDown size={16} className="ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {batchActions.map((action, i) => (
                                <DropdownMenuItem
                                    key={i}
                                    onSelect={() => setConfirmAction(() => () => action.onClick(selectedRows))}
                                >
                                    {action.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                <div className="relative w-full max-w-sm ml-auto">
                    <Input
                        placeholder={searchPlaceholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="pr-8"
                    />
                    {inputValue && (
                        <button
                            onClick={() => setInputValue("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(value)}
                                >
                                    {(column.columnDef.meta as { label?: string })?.label ?? column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="default" onClick={() => tableActions.onCreate?.()}>
                    <span className="flex items-center gap-1">
                        <span className="text-lg leading-none">+</span> Create
                    </span>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-wrap items-center justify-between space-y-2 gap-2 py-4">
                <div className="text-muted-foreground text-sm">
                    {data.length > 0 && (
                        <>
                            Showing {(page - 1) * perPage + 1}–
                            {Math.min(page * perPage, totalCount)} of {totalCount}
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{perPageLabel}</span>
                        <select
                            className="border rounded px-2 py-1 text-sm bg-transparent"
                            value={perPage}
                            onChange={(e) => onPerPageChange(Number(e.target.value))}
                        >
                            {rowsPerPageOptions.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {previousLabel}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {nextLabel}
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={!!confirmAction} onOpenChange={(open) => { if (!open) setConfirmAction(null) }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setConfirmAction(null)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                confirmAction?.()
                                setConfirmAction(null)
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
