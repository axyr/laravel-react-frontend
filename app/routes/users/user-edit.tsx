import { useParams } from 'react-router'
import AppLayout from '~/core/layouts/app-layout'
import { setMeta } from '~/core/lib/meta'
import { getUser, updateUser } from '~/routes/users/api'
import { useResourceForm } from '~/core/hooks/use-resource-form'
import InputField from '~/components/forms/input-field'
import FormActions from '~/components/forms/form-actions'
import type { BreadcrumbItem } from '~/core/types'
import type { User } from './types'

const title = 'Edit User'

export function meta() {
    return setMeta(title)
}

export default function UserPage() {
    const { id = '' } = useParams<{ id: string }>()

    const { form, onSubmit, recentlySuccessful, isSubmitting } = useResourceForm<User>({
        id,
        fetch: getUser,
        update: updateUser,
    })

    const { register, formState: { errors } } = form

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Users', href: '/users' },
        { title, href: `/users/${id}` },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="max-w-lg p-4 space-y-6">
                <InputField
                    name="name"
                    label="Name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    register={register('name')}
                    error={errors.name}
                />

                <InputField
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    disabled={isSubmitting}
                    register={register('email')}
                    error={errors.email}
                />

                <FormActions
                    backTo="/users"
                    isSubmitting={isSubmitting}
                    recentlySuccessful={recentlySuccessful}
                />
            </form>
        </AppLayout>
    )
}