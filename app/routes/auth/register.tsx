import React from 'react'
import { useForm } from 'react-hook-form'
import type { Route } from './+types/login'
import { handleValidationErrors } from '~/lib/handle-validation-errors'
import { auth } from './auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import TextLink from '~/components/text-link'
import AuthLayout from '~/layouts/auth-layout'
import type { LoginFields, RegisterFields } from '~/routes/auth/types'

const title = 'Create an account'
const description = 'Enter your details below to create your account'

export function meta({}: Route.MetaArgs) {
    return [
        {title},
        {name: 'description', content: description},
    ]
}

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm<RegisterFields>()

    const onSubmit = handleSubmit((data: RegisterFields) => {
        auth.register(data)
            .catch((error) => handleValidationErrors<RegisterFields>(error, setError))
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
                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">
                            Email password reset link
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm">
                    Or, return to{' '}
                    <TextLink
                        to="/auth/login"
                        className="underline decoration-neutral"
                        tabIndex={5}
                    >
                        Login
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    )
}