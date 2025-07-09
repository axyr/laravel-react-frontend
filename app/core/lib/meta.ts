import { useSharedStore } from '~/core/stores/shared-store'

export function setMeta(title: string, description?: string) {
    const name = useSharedStore.getState().name
    return [
        { title: title ? `${title} - ${name}` : name },
        ...(description ? [{ name: 'description', content: description }] : []),
    ]
}