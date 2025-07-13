import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import InputError from '~/components/input-error'
import type { FieldError } from 'react-hook-form'

type InputFieldProps = {
    name: string
    label: string
    type?: string
    placeholder?: string
    disabled?: boolean
    autoComplete?: string
    error?: FieldError
    register: ReturnType<any>
    className?: string
    tabIndex?: number
}

export default function InputField({
    name,
    label,
    type = 'text',
    placeholder,
    disabled,
    autoComplete,
    error,
    register,
    className = '',
    tabIndex,
}: InputFieldProps) {
    return (
        <div className={`grid gap-2 ${className}`}>
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                tabIndex={tabIndex}
                {...register}
            />
            <InputError message={error?.message} />
        </div>
    )
}
