import { Button } from '~/components/ui/button'
import type { Route } from './+types/home'
import { href, useNavigate } from 'react-router'
import { setMeta } from '~/lib/meta'

export function meta({}: Route.MetaArgs) {
    return setMeta('', 'Welcome to React Router!')
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