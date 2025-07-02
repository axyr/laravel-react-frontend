import { Button } from '~/components/ui/button'
import type { Route } from './+types/home'
import { useSharedStore } from '~/stores/shared-store'
import { href, useNavigate } from 'react-router'

export function meta({}: Route.MetaArgs) {
    const name = useSharedStore((s) => s.name)
    return [
        {title: name},
        {name: 'description', content: 'Welcome to React Router!'},
    ]
}

export default function Home() {
    const navigate = useNavigate()
    const onSubmit =  () => navigate(href('/dashboard'), {replace: true})

    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Button onClick={onSubmit}>Click me</Button>
        </div>
    )
}