import React from 'react';
import InputError from '~/components/input-error';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import HeadingSmall from '~/components/heading-small';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { LoaderCircle } from 'lucide-react'
import { auth } from '~/routes/auth/auth'
import { handleValidationErrors } from '~/core/lib/handle-validation-errors'
import type { DeleteUserFields } from '~/routes/settings/types'
import { settings } from '~/routes/settings/settings'
import { useAuthStore } from '~/core/stores/auth-store'
import { useNavigate } from 'react-router'

export default function DeleteUser() {

    const {
        register,
        handleSubmit,
        setError,
        reset,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<DeleteUserFields>()

    const setUser = useAuthStore(s => s.setUser)
    const navigate = useNavigate()

    const deleteUser = handleSubmit((data: DeleteUserFields) => {
        settings.deleteProfile(data)
            .then(() => {
                setUser(null)
                navigate('/', {replace: true})
            })
            .catch((error) => handleValidationErrors<DeleteUserFields>(error, setError))
            .finally(() => reset())
    })

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete account</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                            to confirm you would like to permanently delete your account.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    {...register('password')}
                                />
                                <InputError message={errors.password?.message} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={isSubmitting} >
                                    {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    <span>Delete account</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}