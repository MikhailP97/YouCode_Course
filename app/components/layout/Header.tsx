import Link from 'next/link';
import { Typography } from '../ui/typography';
import { ThemeToggle } from '../theme/ThemeToggle';
import { SiteConfig } from '@/app/lib/site-config';
import Image from 'next/image';
import { Button } from '../ui/button';
import { getAuthSession } from '@/app/lib/auth';
import { signIn } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useMutation } from '@tanstack/react-query';
import { LoginButton } from '@/app/features/auth/LoginButton';
import { AuthButton } from '@/app/features/auth/AuthButton';



export async function Header() {
    const session = await getAuthSession()

    // const { mutate } = useMutation({ mutationFn: signIn() })
    // const Signin = (): JSX.Element => {
    //     if (session) {
    //         return <Button variant="outline" onClick={useMutation(signIn())}>Connexion</Button>
    //     }
    //     return (
    //         <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //             <Avatar>
    //                 <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    //                 <AvatarFallback>CN</AvatarFallback>
    //             </Avatar>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent className="w-56">
    //             <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //             <DropdownMenuSeparator />
    //             <AlertDialog>
    //                 <AlertDialogTrigger asChild>
    //                     <Button variant="ghost">Logout</Button>
    //                 </AlertDialogTrigger>
    //                 <AlertDialogContent>
    //                     <AlertDialogHeader>
    //                         <AlertDialogTitle>Logout ?</AlertDialogTitle>
    //                     </AlertDialogHeader>
    //                     <AlertDialogFooter>
    //                         <AlertDialogCancel>Cancel</AlertDialogCancel>
    //                         <AlertDialogAction>Continue</AlertDialogAction>
    //                     </AlertDialogFooter>
    //                 </AlertDialogContent>
    //             </AlertDialog>
    //         </DropdownMenuContent>
    //         </DropdownMenu>
    //     )
    // }
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background px-4">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex items-center gap-2">
                    <Image src="/images/logo.svg" width={50} height={35} alt="app logo" />
                    <Typography variant="h3" as={Link} href="/">
                        {SiteConfig.title}
                    </Typography>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <ThemeToggle />
                        <AuthButton />
                    </nav>
                </div>
            </div>
        </header>
    );
}