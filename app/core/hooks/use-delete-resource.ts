import { useState } from 'react'
import { toast } from 'sonner'

type DeleteFn<T> = (id: string | number) => Promise<unknown>

export function useDeleteResource<T extends { id: string | number; name?: string }>(
    deleteFn: DeleteFn<T>,
    removeFromList: (updater: (prev: T[]) => T[]) => void,
    successMessage = 'Deleted successfully',
    errorMessage = 'Error deleting item'
) {
    const [resourceToDelete, setResourceToDelete] = useState<T | null>(null)

    const confirmDelete = (resource: T) => {
        setResourceToDelete(resource)
    }

    const cancelDelete = () => {
        setResourceToDelete(null)
    }

    const handleConfirmedDelete = () => {
        if (!resourceToDelete) return

        deleteFn(resourceToDelete.id)
            .then(() => {
                toast.success(successMessage)
                removeFromList(prev => prev.filter(item => item.id !== resourceToDelete.id))
            })
            .catch(() => {
                toast.error(errorMessage)
            })
            .finally(() => {
                setResourceToDelete(null)
            })
    }

    return {
        resourceToDelete,
        confirmDelete,
        cancelDelete,
        handleConfirmedDelete,
    }
}
