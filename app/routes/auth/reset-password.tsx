import React from 'react'
import { useForm } from 'react-hook-form'
import type { Route } from './+types/login'
import { handleValidationErrors } from '~/lib/handle-validation-errors'
import { auth } from './auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import AuthLayout from '~/layouts/auth-layout'
import type { ResetPasswordFields } from '~/routes/auth/types'
import { useQueryParam } from '~/hooks/use-query-param'
import { href, useNavigate, useParams } from 'react-router'
import { LoaderCircle } from 'lucide-react'

const title = 'Reset password'
const description = 'Please enter your new password below.'

export function meta({}: Route.MetaArgs) {
    return [
        {title},
        {name: 'description', content: description},
    ]
}

export default function ForgotPassword() {
    const { token } = useParams()
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
            .then(() => navigate(href('/auth/login'), {replace: true}))
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
                            tabIndex={3}
                            {...register('password_confirmation')}
                        />
                        <InputError message={errors.password_confirmation?.message} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting}>
                            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            <span>Reset password</span>
                        </Button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    )
}