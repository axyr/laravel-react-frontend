import InputError from '~/components/input-error'
import AppLayout from '~/core/layouts/app-layout'
import SettingsLayout from '~/core/layouts/settings/layout'
import { type BreadcrumbItem } from '~/core/types'
import { Transition } from '@headlessui/react'
import React from 'react'
import HeadingSmall from '~/components/heading-small'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useForm } from 'react-hook-form'
import type { UpdatePasswordFields } from '~/routes/settings/types'
import { useRecentlySuccessful } from '~/core/hooks/use-recently-successful'
import { settings } from '~/routes/settings/settings'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import { LoaderCircle } from 'lucide-react'
import { setMeta } from '~/core/lib/meta'

const title = 'Password settings'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: title,
        href: '/settings/password',
    },
];

export function meta() {
    return setMeta(title)
}

export default function Password() {

    const form = useForm<UpdatePasswordFields>()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = form

    const recentlySuccessful = useRecentlySuccessful(form, {
        duration: 2000,
        reset: 'keepValues',
    })

    const updatePassword = handleSubmit((data: UpdatePasswordFields) => {
        settings
            .updatePassword(data)
            .catch((error) => handleValidationErrors<UpdatePasswordFields>(error, setError))
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Update password" description="Ensure your account is using a long, random password to stay secure" />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">Current password</Label>
                            <Input
                                id="current_password"
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                placeholder="Current password"
                                {...register('current_password')}
                            />
                            <InputError message={errors.current_password?.message} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New password</Label>
                            <Input
                                id="password"
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="New password"
                                {...register('password')}
                            />
                            <InputError message={errors.password?.message} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                {...register('password_confirmation')}
                            />
                            <InputError message={errors.password_confirmation?.message} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" className="flex items-center gap-4" disabled={isSubmitting}>
                                {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                <span>Save password</span>
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}