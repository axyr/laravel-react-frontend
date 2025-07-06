import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '~/components/ui/checkbox'
import { Button } from '~/components/ui/button'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '~/components/ui/dropdown-menu'

type ColOptions<T> = {
    label?: string
    sortable?: boolean
    align?: 'left' | 'right' | 'center'
    format?: (value: any, row: T) => React.ReactNode
    header?: ColumnDef<T>['header']
    cell?: ColumnDef<T>['cell']
}

type ActionItem<T> = {
    label: string
    onClick: (row: T) => void
}

export function col<T extends object>(
    key: keyof T & string,
    options: ColOptions<T> = {}
): ColumnDef<T> {
    const {
        label = key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        sortable = false,
        align = 'left',
        format,
        header,
        cell,
    } = options

    const alignClass =
        align === 'right'
            ? 'text-right'
            : align === 'center'
                ? 'text-center'
                : 'text-left'

    return {
        accessorKey: key,
        enableSorting: sortable,
        meta: {
            label: label
        },
        header:
            header ??
            (sortable
                ? ({column}) => (
                    <Button
                        variant="ghost"
                        className={`${alignClass} px-0`}
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        {label}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
                : () => <div className={alignClass}>{label}</div>),
        cell:
            cell ??
            (({row}) => {
                const value = row.getValue(key)
                const content = String(format ? format(value, row.original) : value)
                return <div className={alignClass}>{content}</div>
            }),
    }
}

export function selectCol<T>(): ColumnDef<T> {
    return {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    }
}

export function actionsCol<T>(
    getActions: (row: T) => ActionItem<T>[]
): ColumnDef<T> {
    return {
        id: 'actions',
        enableHiding: false,
        cell: ({row}) => {
            const item = row.original
            const actions = getActions(item)

            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {actions.map((action, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    onClick={() => action.onClick(item)}
                                >
                                    {action.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
}
