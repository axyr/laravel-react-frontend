import AuthLayout from '~/core/layouts/auth-layout'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import { auth } from './auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import TextLink from '~/components/text-link'
import type { ForgotPasswordFields } from '~/routes/auth/types'
import { LoaderCircle } from 'lucide-react'
import { setMeta } from '~/core/lib/meta'

const title = 'Forgot password'
const description = 'Enter your email to receive a password reset link.'

export function meta() {
    return setMeta(title, description)
}

export default function ForgotPassword() {
    const [status, setStatus] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFields>()

    const onSubmit = handleSubmit((data: ForgotPasswordFields) => {
        auth.sendPasswordResetLink(data)
            .then((response) => setStatus(response.message))
            .catch((error) => handleValidationErrors<ForgotPasswordFields>(error, setError))
    })

    return (
        <AuthLayout title={title} description={description}>
            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

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
                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full flex items-center justify-center gap-2" tabIndex={2}  disabled={isSubmitting}>
                            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            <span>Email password reset link</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm">
                    Or, return to{' '}
                    <TextLink
                        to="/auth/login"
                        className="underline decoration-neutral"
                        tabIndex={3}
                    >
                        Login
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    )
}