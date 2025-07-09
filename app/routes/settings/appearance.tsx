import AppearanceTabs from '~/components/appearance-tabs';
import HeadingSmall from '~/components/heading-small';
import { type BreadcrumbItem } from '~/core/types';
import AppLayout from '~/core/layouts/app-layout';
import SettingsLayout from '~/core/layouts/settings/layout';
import { setMeta } from '~/core/lib/meta'

const title = 'Appearance settings'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: title,
        href: '/settings/appearance',
    },
];

export function meta() {
    return setMeta(title)
}

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}