import type { BreadcrumbItem } from '~/types'
import AppLayout from '~/layouts/app-layout'
import type { Route } from '../../.react-router/types/app/routes/+types/home'
import { useSharedStore } from '~/stores/shared-store'

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
            <div className="flex flex-1 flex-col gap-4 p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
        </AppLayout>
    )
}