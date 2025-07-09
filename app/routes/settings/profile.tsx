import { type BreadcrumbItem, type User } from '~/core/types'
import { Transition } from '@headlessui/react';
import React from 'react';
import HeadingSmall from '~/components/heading-small';
import InputError from '~/components/input-error';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import AppLayout from '~/core/layouts/app-layout';
import SettingsLayout from '~/core/layouts/settings/layout';
import { useAuthStore } from '~/core/stores/auth-store'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router'
import type { ProfileFields } from '~/routes/settings/types'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import { settings } from '~/routes/settings/settings'
import { useRecentlySuccessful } from '~/core/hooks/use-recently-successful'
import { LoaderCircle } from 'lucide-react'
import DeleteUser from '~/components/delete-user'
import { setMeta } from '~/core/lib/meta'

const title = 'Profile settings';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: title,
        href: '/settings/profile',
    },
]

export function meta() {
    return setMeta(title)
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {

    const user = useAuthStore((s) => s.user as User)

    const form = useForm<ProfileFields>({
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

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

    const onSubmit = handleSubmit((data: ProfileFields) => {
        settings
            .updateProfile(data)
            .catch((error) => handleValidationErrors<ProfileFields>(error, setError))
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                type="text"
                                placeholder="Full name"
                                autoComplete="name"
                                disabled={isSubmitting}
                                {...register('name')}
                            />
                            <InputError className="mt-2" message={errors.name?.message} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                placeholder="Email address"
                                autoComplete="username"
                                disabled={isSubmitting}
                                {...register('email')}
                            />
                            <InputError className="mt-2" message={errors.email?.message} />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    Your email address is unverified.{' '}
                                    <Link
                                        to={'verification.send'}
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button type="submit" className="flex items-center gap-4" disabled={isSubmitting}>
                                {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                <span>Save</span>
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
                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}