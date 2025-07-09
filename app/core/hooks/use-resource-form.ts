import { useEffect } from 'react'
import { useForm, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { useRecentlySuccessful } from '~/core/hooks/use-recently-successful'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import { toast } from 'sonner'

type SubmitFn<T> = (id: string | number, data: T) => Promise<unknown>
type CreateFn<T> = (data: T) => Promise<T>
type FetchFn<T> = (id: string | number) => Promise<T>

type UseResourceFormProps<T extends FieldValues> =
    | {
    id: string | number
    update: SubmitFn<T>
    fetch: FetchFn<T>
}
    | {
    create: CreateFn<T>
    onSuccess?: (created: T) => void
}

type ResourceFormReturn<T extends FieldValues> = {
    form: UseFormReturn<T>
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
    isSubmitting: boolean
    recentlySuccessful: boolean
}

function isEdit<T extends FieldValues>(
    props: UseResourceFormProps<T>
): props is { id: string | number; update: SubmitFn<T>; fetch: FetchFn<T> } {
    return 'id' in props
}

export function useResourceForm<T extends FieldValues>(
    props: UseResourceFormProps<T>
): ResourceFormReturn<T> {
    const form = useForm<T>()
    const {
        handleSubmit,
        setError,
        reset,
        formState: { isSubmitting },
    } = form

    const recentlySuccessful = useRecentlySuccessful(form, {
        duration: 2000,
        reset: 'keepValues',
    })

    const isEditMode = isEdit(props)
    const id = isEditMode ? props.id : null
    const fetchFn = isEditMode ? props.fetch : null

    useEffect(() => {
        if (isEditMode && fetchFn && id) {
            fetchFn(id).then(reset).catch((err) => toast.warning(err.message))
        }
    }, [isEditMode, fetchFn, id, reset])

    const onSubmit = handleSubmit((data: T) => {
        if (isEdit(props)) {
            return props.update(props.id, data).catch((err) =>
                handleValidationErrors<T>(err, setError)
            )
        } else {
            return props.create(data)
                .then((created) => props.onSuccess?.(created))
                .catch((err) => handleValidationErrors<T>(err, setError))
        }
    })

    return { form, onSubmit, isSubmitting, recentlySuccessful }
}