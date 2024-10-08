"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Loader } from "@/app/components/ui/loader"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { LogIn, LogOut, User2 } from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"

export type LoggedInButtonProps = {
    user: Session["user"]
}

export const LoggedInButton = (props: LoggedInButtonProps) => {
    const mutation = useMutation({
        mutationFn: async () => signOut()
    })
    return (
        <DropdownMenu>
            <AlertDialog>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Avatar className="mr-2 size-6">
                            <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
                            {props.user.image && (
                                <AvatarImage
                                    src={props.user.image}
                                    alt={props.user.name ?? "user picture"}
                                />
                            )}
                        </Avatar>
                        {props.user.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link href="/account">
                            <User2 className="mr-2" size={12} />
                            Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem>
                            <LogOut className="mr-2" size={12} />
                            Logout
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to logout ?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel asChild><Button variant="secondary">Cancel</Button></AlertDialogCancel>
                        <Button variant="destructive" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                            {mutation.isPending ? (
                                <Loader className="mr-2" size={12} />
                            ) : <LogOut className="mr-2" size={12} />}
                            Logout
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>
    )
}
