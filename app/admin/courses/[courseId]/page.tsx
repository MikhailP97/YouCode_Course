

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { getCourse } from './course.query';
import { getRequiredAuthSession } from '@/app/lib/auth';
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/app/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TableHeader, TableHead, TableBody, TableRow, TableCell, Table } from '@/app/components/ui/table';
import { Typography } from '@/app/components/ui/typography';
import { CoursePaginationButton } from '@/app/features/pagination/CoursePaginationButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';

export default async function CoursePage({
    params,
    searchParams,
}: {
    params: {
        courseId: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const page = Number(searchParams.page ?? 1);
    console.log({ page });
    const session = await getRequiredAuthSession();
    const course = await getCourse({
        courseId: params.courseId,
        userId: session.user.id,
        userPage: page,
    });
    console.log(course)
    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Courses</LayoutTitle>
            </LayoutHeader>
            <LayoutContent className="flex flex-col gap-4 lg:flex-row">
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                            </TableHeader>
                            <TableBody>
                                {course.users?.map((user) => (
                                    <TableRow>
                                        <TableCell>
                                            <Avatar className="rounded">
                                                <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                                                {user.image && (
                                                    <AvatarImage src={user.image} alt={user.email ?? ''} />
                                                )}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                as={Link}
                                                variant="large"
                                                href={`/admin/users/${user.id}`}
                                            >
                                                {user.email}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <CoursePaginationButton
                            baseUrl={`/admin/courses/${course.id}`}
                            page={page}
                            totalPage={course._count?.users ?? 0 / 5}
                        />
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Avatar className="rounded">
                            <AvatarFallback>{course.name?.[0]}</AvatarFallback>
                            {course.image && (
                                <AvatarImage src={course.image} alt={course.name ?? ''} />
                            )}
                        </Avatar>
                        <CardTitle>{course.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1">
                        <Typography>{course._count?.users} users</Typography>
                        <Typography>{course._count?.lessons} lessons</Typography>
                        <Link
                            href={`/admin/courses/${course.id}/edit`}
                            className={buttonVariants({
                                variant: 'outline',
                            })}
                        >
                            Edit
                        </Link>{' '}
                        <Link
                            href={`/admin/courses/${course.id}/lessons`}
                            className={buttonVariants({
                                variant: 'outline',
                            })}
                        >
                            Edit lessons
                        </Link>
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    );
}