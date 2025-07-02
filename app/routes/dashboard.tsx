import type { BreadcrumbItem } from '~/types'
import { BreadcrumbProvider } from '~/components/breadcrumb-context'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
]

export default function Dashboard() {
    return (
        <BreadcrumbProvider value={breadcrumbs}>
            <div className="flex flex-1 flex-col gap-4 p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                    <div className="bg-muted/50 aspect-video rounded-xl" />
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
        </BreadcrumbProvider>
    )
}