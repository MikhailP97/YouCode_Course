import { getAuthSession } from '@/app/lib/auth'
import React from 'react'
import { LoginButton } from './LoginButton'
import { LoggedInButton } from './LoggedInButton'

export const AuthButton = async () => {

    const session = await getAuthSession()
    const user = session?.user

    if (!user) {
        return <LoginButton />
    }

    return <LoggedInButton user={user} />
}
