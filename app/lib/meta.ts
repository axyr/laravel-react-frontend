import { useSharedStore } from '~/stores/shared-store'

export function setMeta(title: string, description?: string) {
    const name = useSharedStore((s) => s.name)
    return [
        { title: title ? `${title} - ${name}` : name },
        ...(description ? [{ name: 'description', content: description }] : []),
    ]
}