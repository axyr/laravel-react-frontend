import type { ColumnDef } from '@tanstack/react-table'
import type { User } from './types'
import { col, selectCol, actionsCol } from '~/components/table/columns'

type ColumnCallbacks = {
    onEdit: (user: User) => void
    onDelete: (user: User) => void
}

export function getColumns({ onEdit, onDelete }: ColumnCallbacks): ColumnDef<User>[] {
    return [

        col<User>('id', {
            label: '#',
            sortable: true,
            format: (val) => val,
        }),

        col<User>('name', {
            label: 'Name',
            sortable: true,
            format: (val) => val,
        }),

        col<User>('email', {
            label: 'E-mail',
            sortable: true,
            format: (val) => val,
        }),

        col<User>('email_verified_at', {
            label: 'Verified at',
            align: 'right',
            format: (val) => (val ? new Date(val).toLocaleDateString() : '-'),
        }),

        actionsCol<User>((user) => [
            { label: 'Edit', onClick: () => onEdit(user) },
            { label: 'Delete', onClick: () => onDelete(user) },
        ]),
    ]
}
