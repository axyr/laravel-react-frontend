import { useEffect, useState } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

export function useRecentlySuccessful<T extends FieldValues>(
    form: UseFormReturn<T>,
    options: { duration?: number; reset?: boolean | 'keepValues' } = {}
) {
    const { reset, formState } = form
    const { isSubmitSuccessful } = formState
    const [recentlySuccessful, setRecentlySuccessful] = useState(false)

    useEffect(() => {
        if (isSubmitSuccessful) {
            setRecentlySuccessful(true)

            const timeout = setTimeout(() => {
                setRecentlySuccessful(false)

                if (options.reset === true) {
                    reset()
                } else if (options.reset === 'keepValues') {
                    reset(undefined, { keepValues: true })
                }
            }, options.duration ?? 2000)

            return () => clearTimeout(timeout)
        }
    }, [isSubmitSuccessful, reset, options.reset, options.duration])

    return recentlySuccessful
}