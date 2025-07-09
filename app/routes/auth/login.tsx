import AuthLayout from '~/core/layouts/auth-layout'
import React from 'react'
import { useForm } from 'react-hook-form'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import { auth } from './auth'
import { useAuthStore } from '~/core/stores/auth-store'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import TextLink from '~/components/text-link'
import { Checkbox } from '~/components/ui/checkbox'
import { href, useLocation, useNavigate } from 'react-router'
import type { LoginFields } from '~/routes/auth/types'
import { LoaderCircle } from 'lucide-react'
import { setMeta } from '~/core/lib/meta'

const title = 'Login to your account'
const description = 'Enter your email below to login to your account.'

export function meta() {
    return setMeta(title, description)
}

export default function Login() {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<LoginFields>({
        defaultValues: {
            remember: false,
        },
    })

    const {setUser} = useAuthStore()
    const navigate = useNavigate()
    const location = useLocation()
    const status = location.state?.status as string | undefined
    const onSubmit = handleSubmit((data: LoginFields) => {
        auth.login(data)
            .then(() => auth.getUser())
            .then(setUser)
            .then(() => navigate(href('/dashboard'), {replace: true}))
            .catch((error) => handleValidationErrors<LoginFields>(error, setError))
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
                        <Button type="submit" className="w-full flex items-center justify-center gap-2" tabIndex={4}  disabled={isSubmitting}>
                            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            <span>Login</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <TextLink
                        to="/auth/register"
                        className="underline decoration -neutral"
                        tabIndex={6}
                    >
                        Sign up
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    )
}