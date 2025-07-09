import type { FieldValues, UseFormSetError, Path } from 'react-hook-form'
import type { AxiosError } from 'axios'

export function handleValidationErrors<T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>
) {
    const axiosError = error as AxiosError

    if (axiosError.response?.status === 422) {
        const response = axiosError.response.data as {
            message: string
            errors: Record<string, string[]>
        }

        Object.entries(response.errors).forEach(([key, messages]) => {
            setError(key as Path<T>, {
                type: 'server',
                message: messages[0],
            })
        })
    }
}