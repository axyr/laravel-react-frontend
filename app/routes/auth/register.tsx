import AuthLayout from '~/core/layouts/auth-layout'
import React from 'react'
import { useForm } from 'react-hook-form'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import { auth } from './auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import TextLink from '~/components/text-link'
import type { RegisterFields } from '~/routes/auth/types'
import { LoaderCircle } from 'lucide-react'
import { href, useNavigate } from 'react-router'
import { useAuthStore } from '~/core/stores/auth-store'
import { setMeta } from '~/core/lib/meta'

const title = 'Create an account'
const description = 'Enter your details below to create your account'

export function meta() {
    return setMeta(title, description)
}

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<RegisterFields>()
    const {setUser} = useAuthStore()
    const navigate = useNavigate()
    const onSubmit = handleSubmit((data: RegisterFields) => {
        auth.register(data)
            .then(() => auth.getUser())
            .then(setUser)
            .then(() => navigate(href('/dashboard'), {replace: true}))
            .catch((error) => handleValidationErrors<RegisterFields>(error, setError))
    })

    return (
        <AuthLayout title={title} description={description}>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Full name"
                            autoComplete="name"
                            autoFocus
                            tabIndex={1}
                            disabled={isSubmitting}
                            {...register('name')}
                        />
                        <InputError message={errors.name?.message} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            autoComplete="email"
                            tabIndex={2}
                            disabled={isSubmitting}
                            {...register('email')}
                        />
                        <InputError message={errors.email?.message} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            tabIndex={3}
                            disabled={isSubmitting}
                            {...register('password')}
                        />
                        <InputError message={errors.password?.message} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="Confirm password"
                            autoComplete="new-password"
                            tabIndex={4}
                            disabled={isSubmitting}
                            {...register('password_confirmation')}
                        />
                        <InputError message={errors.password_confirmation?.message} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full flex items-center justify-center gap-2" tabIndex={5} disabled={isSubmitting}>
                            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            <span>Create account</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm">
                    Or, return to{' '}
                    <TextLink
                        to="/auth/login"
                        className="underline decoration-neutral"
                        tabIndex={6}
                    >
                        Login
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    )
}