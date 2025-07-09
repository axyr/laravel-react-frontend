import React from 'react'
import { useNavigate } from 'react-router'
import AppLayout from '~/core/layouts/app-layout'
import { setMeta } from '~/core/lib/meta'
import { deleteUser, getUsers } from '~/routes/users/api'
import { DataTable } from '~/components/table/table'
import { useTableData } from '~/components/table/use-table-data'
import { getColumns } from '~/routes/users/table-columns'
import { useDeleteResource } from '~/core/hooks/use-delete-resource'
import { ConfirmDeleteDialog } from '~/components/confirm-delete-dialog'

import type { User } from '~/routes/users/types'
import type { BreadcrumbItem } from '~/core/types'

const title = 'Users'

export function meta() {
    return setMeta(title)
}

export default function Users() {
    const navigate = useNavigate()
    const breadcrumbs: BreadcrumbItem[] = [{ title, href: '/users' }]

    const {
        data,
        setData,
        totalCount,
        tableState,
        tableActions,
    } = useTableData<User>(async (params) => {
        const res = await getUsers(params)
        return {
            data: res.data.data,
            total: res.data.meta.total,
        }
    })

    const {
        resourceToDelete,
        confirmDelete,
        cancelDelete,
        handleConfirmedDelete,
    } = useDeleteResource<User>(
        deleteUser,
        setData,
        'User deleted',
        'Error deleting user'
    )

    const handleEdit = (user: User) => {
        navigate(`/users/${user.id}`, { replace: true })
    }

    tableActions.onCreate = () => {
        navigate('/users/create')
    }

    const columns = getColumns({
        onEdit: handleEdit,
        onDelete: confirmDelete,
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DataTable
                data={data}
                totalCount={totalCount}
                columns={columns}
                tableState={tableState}
                tableActions={tableActions}
            />

            <ConfirmDeleteDialog
                open={!!resourceToDelete}
                itemLabel={resourceToDelete?.name}
                onCancel={cancelDelete}
                onConfirm={handleConfirmedDelete}
            />
        </AppLayout>
    )
}