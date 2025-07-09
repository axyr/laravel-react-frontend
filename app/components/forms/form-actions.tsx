import { Link } from 'react-router'
import { Transition } from '@headlessui/react'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { Button } from '~/components/ui/button'

type FormActionsProps = {
    backTo: string
    isSubmitting?: boolean
    recentlySuccessful?: boolean
    backLabel?: string
    savedLabel?: string
    submitLabel?: string
}

export default function FormActions({
    backTo,
    isSubmitting = false,
    recentlySuccessful = false,
    backLabel = 'Back',
    savedLabel = 'Saved',
    submitLabel = 'Save changes',
}: FormActionsProps) {
    return (
        <div className="flex items-center justify-between pt-4">
            <Link
                to={backTo}
                className="text-sm inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
            </Link>

            <div className="ml-auto flex items-center gap-4">
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-muted-foreground">{savedLabel}</p>
                </Transition>

                <Button
                    type="submit"
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    <span>{submitLabel}</span>
                </Button>
            </div>
        </div>
    )
}
