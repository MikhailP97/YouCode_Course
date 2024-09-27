'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { LoginButton } from '../features/auth/LoginButton'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Card className='m-auto mt-6 max-w-lg'>
            <CardHeader>
                <CardTitle>You need to be logged</CardTitle>
            </CardHeader>
            <CardFooter>
                <LoginButton />
            </CardFooter>
        </Card>
    )
}