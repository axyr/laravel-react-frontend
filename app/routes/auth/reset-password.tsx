import AuthLayout from '~/core/layouts/auth-layout'
import React from 'react'
import { useForm } from 'react-hook-form'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import { auth } from './auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import type { ResetPasswordFields } from '~/routes/auth/types'
import { useQueryParam } from '~/core/hooks/use-query-param'
import { href, useNavigate, useParams } from 'react-router'
import { LoaderCircle } from 'lucide-react'
import TextLink from '~/components/text-link'
import { setMeta } from '~/core/lib/meta'

const title = 'Reset password'
const description = 'Please enter your new password below.'

export function meta() {
    return setMeta(title, description)
}

export default function ResetPassword() {
    const {token} = useParams()
    const email = useQueryParam('email')
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<ResetPasswordFields>({
        defaultValues: {
            token: token,
            email: email ?? undefined,
        },
    })

    const onSubmit = handleSubmit((data: ResetPasswordFields) => {
        auth.resetPassword(data)
            .then((response) => navigate(href('/auth/login'), {replace: true, state: {status: response.message}}))
            .catch((error) => handleValidationErrors<ResetPasswordFields>(error, setError))
    })

    return (
        <AuthLayout title={title} description={description}>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            autoComplete="email"
                            autoFocus
                            tabIndex={1}
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
                            tabIndex={2}
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
                            tabIndex={3}
                            {...register('password_confirmation')}
                        />
                        <InputError message={errors.password_confirmation?.message} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full flex items-center justify-center gap-2" tabIndex={4} disabled={isSubmitting}>
                            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            <span>Reset password</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm">
                    Or, {' '}
                    <TextLink
                        to="/auth/forgot-password"
                        className="underline decoration-neutral"
                        tabIndex={5}
                    >
                        Request new password reset link
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    )
}