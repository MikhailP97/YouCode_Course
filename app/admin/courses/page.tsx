import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/app/components/layout/layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Card, CardContent } from '@/app/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { Typography } from '@/app/components/ui/typography'
import { getAuthSession, getRequiredAuthSession } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default async function page() {
    const session = await getRequiredAuthSession()

    const courses = await prisma.course.findMany({ where: { authorId: session?.user.id } })

    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Courses</LayoutTitle>
            </LayoutHeader>
            <LayoutContent>
                <Card>
                    <CardContent className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow>
                                        <TableCell>
                                            <Avatar className="rounded">
                                                <AvatarFallback>{course.name[0]}</AvatarFallback>
                                                {course.image && (
                                                    <AvatarImage src={course.image} alt={course.name} />
                                                )}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                as={Link}
                                                variant="large"
                                                href={`/admin/courses/${course.id}`}
                                            >
                                                {course.name}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    )
}