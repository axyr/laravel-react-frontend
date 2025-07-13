import AppLayout from '~/core/layouts/app-layout'
import { setMeta } from '~/core/lib/meta'
import { createUser } from '~/routes/users/api'
import { useResourceForm } from '~/core/hooks/use-resource-form'
import InputField from '~/components/forms/input-field'
import FormActions from '~/components/forms/form-actions'
import type { BreadcrumbItem } from '~/core/types'
import type { User } from './types'
import { useNavigate } from 'react-router'

const title = 'Create User'

export function meta() {
    return setMeta(title)
}

export default function UserCreatePage() {

    const navigate = useNavigate()

    const {form, onSubmit, recentlySuccessful, isSubmitting} = useResourceForm<User>({
        create: createUser,
        onSuccess: (user) => {
            navigate(`/users/${user.id}`)
        }
    })

    const {register, formState: {errors}} = form

    const breadcrumbs: BreadcrumbItem[] = [
        {title: 'Users', href: '/users'},
        {title: title, href: '/users/create'},
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

                <InputField
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    register={register('password')}
                    error={errors.password}
                />

                <InputField
                    name="password_confirmation"
                    type="password"
                    label="Confirm password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    register={register('password_confirmation')}
                    error={errors.password_confirmation}
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