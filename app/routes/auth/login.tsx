import React from 'react'
import { useForm } from 'react-hook-form'
import type { Route } from './+types/login'
import { handleValidationErrors } from '~/lib/handle-validation-errors'
import { auth } from './auth'
import { useAuthStore } from '~/stores/auth-store'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import TextLink from '~/components/text-link'
import { Checkbox } from '~/components/ui/checkbox'
import { href, Navigate, useNavigate } from 'react-router'

const title = 'Login to your account'
const description = 'Enter your email below to login to your account.'

export function meta({}: Route.MetaArgs) {
    return [
        {title},
        {name: 'description', content: description},
    ]
}

type LoginFields = {
    email: string
    password: string
    remember: boolean
}

export default function Login() {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: {errors},
    } = useForm<LoginFields>({
        defaultValues: {
            remember: false,
        },
    })

    const {setUser} = useAuthStore()
    const navigate = useNavigate()

    const onSubmit = (data: LoginFields) => {
        auth.login(data)
            .then(() => auth.getUser())
            .then(setUser)
            .then(() => navigate(href('/dashboard'), {replace: true}))
            .catch((error) => handleValidationErrors<LoginFields>(error, setError))
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <TextLink
                                                to="/auth/forgot-password"
                                                className="ml-auto inline-block text-sm"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            autoComplete="current-password"
                                            tabIndex={2}
                                            {...register('password')}
                                        />
                                        <InputError message={errors.password?.message} />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            {...register('remember')}
                                            onCheckedChange={checked => setValue('remember', checked === true)}
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember">Remember me</Label>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Button type="submit" className="w-full">
                                            Login
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{' '}
                                    <TextLink
                                        to="/auth/register"
                                        className="underline decoration-neutral"
                                        tabIndex={5}
                                    >
                                        Sign up
                                    </TextLink>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}