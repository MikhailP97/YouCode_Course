import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { getAuthSession } from '../lib/auth'
import { Button, buttonVariants } from '../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import Link from 'next/link'
import { LogoutButton } from '../features/auth/LogoutButton'

export default async function page() {
    const session = await getAuthSession()

    if (!session) {
        throw new Error("No session found")
    }

    const user = session?.user

    return (
        <Card className='m-auto mt-6 max-w-lg'>
            <CardHeader className='flex flex-row gap-2 space-y-0'>
                <Avatar>
                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    {user.image && (
                        <AvatarImage
                            src={user.image}
                            alt={user.name ?? "user picture"}
                        />
                    )}
                </Avatar>
                <div className='flex flex-col gap-1'>
                    <CardTitle>
                        {user?.name}
                    </CardTitle>
                    <CardDescription>
                        {user?.email}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className='flex gap-2'>
                <Link className={buttonVariants({ variant: "outline" })} href="/admin">Admin</Link>
                <Link className={buttonVariants({ variant: "outline" })} href="/settings">Settings</Link>
            </CardContent>
            <CardFooter className='flex flex-row-reverse'>
                <LogoutButton />
            </CardFooter>
        </Card>
    )
}
