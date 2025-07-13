import type { LucideIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'

type Props = {
    title: string
    description?: string
    icon?: LucideIcon
    actionLabel?: string
    onAction?: () => void
}

export function EmptyPlaceholder({title, description, icon: Icon, actionLabel, onAction}: Props) {
    const DisplayIcon = Icon ?? undefined
    const iconClass = 'w-12 h-12 text-muted mb-4'

    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="flex flex-col items-center justify-center text-center w-full h-full rounded-xl border border-border bg-muted/50 p-6">
                {DisplayIcon && <DisplayIcon className={iconClass} />}
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                {description && <p className="text-muted-foreground text-sm mt-2">{description}</p>}
                {onAction && (
                    <Button onClick={onAction} className="mt-6">
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    )
}