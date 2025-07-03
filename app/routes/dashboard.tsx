import type { BreadcrumbItem } from '~/types'
import AppLayout from '~/layouts/app-layout'
import type { Route } from '../../.react-router/types/app/routes/+types/home'
import { useSharedStore } from '~/stores/shared-store'
import { PlaceholderPattern } from '~/components/ui/placeholder-pattern'

const title = 'Dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: title,
        href: '/dashboard',
    },
]

export function meta({}: Route.MetaArgs) {
    const name = useSharedStore((s) => s.name)
    return [
        {title: `${title} - ${name}`},
    ]
}

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    )
}