import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function ForbiddenPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardContent className="py-10">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <AlertTriangle className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-semibold text-foreground">403 – Access Denied</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        You don’t have permission to access this page.
                    </p>
                    <Button variant="outline" className="mt-6" asChild>
                        <a href="/dashboard">Back to Dashboard</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
