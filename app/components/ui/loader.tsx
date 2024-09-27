import { cn } from '@/app/lib/utils'
import { Loader2, LucideProps } from 'lucide-react'
import React from 'react'

export const Loader = ({ className, ...props }: LucideProps) => {
    return (
        <Loader2 className={cn("animate-spin", className)} {...props} />
    )
}
