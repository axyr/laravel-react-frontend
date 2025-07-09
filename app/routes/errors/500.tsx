import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { ServerCrash } from 'lucide-react'

export default function InternalServerErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardContent className="py-10">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <ServerCrash className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-semibold text-foreground">500 – Server Error</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Something went wrong on our end. Please try again later.
                    </p>
                    <Button variant="outline" className="mt-6" asChild>
                        <a href="/dashboard">Back to Dashboard</a>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
