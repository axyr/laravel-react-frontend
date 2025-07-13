import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '~/components/ui/select'
import { Label } from '~/components/ui/label'
import InputError from '~/components/input-error'
import { type Control, type FieldError, type FieldPath, type FieldValues, useController, } from 'react-hook-form'

type Props<T extends FieldValues> = {
    name: FieldPath<T>
    control: Control<T>
    options: Option[]
    label?: string
    disabled?: boolean
    className?: string
    placeholder?: string
    error?: FieldError
}

export default function SelectField<T extends FieldValues>({
    name,
    control,
    options,
    label,
    disabled,
    className = '',
    placeholder = 'Select an option',
    error,
}: Props<T>) {
    const {
        field: {value, onChange, ref},
    } = useController({name, control})

    return (
        <div className={`grid gap-2 w-full ${className}`}>
            <Label htmlFor={name}>{label}</Label>
            <Select
                value={value?.toString() ?? ''}
                onValueChange={onChange}
                disabled={disabled}
            >
                <SelectTrigger ref={ref} id={name} className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value.toString()}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <InputError message={error?.message} />
        </div>
    )
}