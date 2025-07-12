import type { LucideIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'

type Props = {
    title: string
    description?: string
    icon?: LucideIcon
    actionLabel?: string
    onAction?: () => void
}

export function EmptyPlaceholder({ title, description, icon: Icon, actionLabel, onAction }: Props) {
    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="flex flex-col items-center justify-center text-center bg-neutral-50 rounded-xl w-full h-full">
                {Icon && <Icon className="w-12 h-12 text-neutral-200 mb-4" />}
                <h2 className="text-lg">{title}</h2>
                {description && <p className="text-muted-foreground text-sm mt-2">{description}</p>}
                {actionLabel && onAction && (
                    <Button onClick={onAction} className="mt-6">
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    )
}
