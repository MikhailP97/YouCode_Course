import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "@/app/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getLessons } from "./lessons.query";
import { getRequiredAuthSession } from "@/app/lib/auth";
import { notFound } from "next/navigation";
import { LessonItem } from "./LessonItem";

export default async function LessonsPage({
    params,
}: {
    params: {
        courseId: string;
    };
}) {

    const session = await getRequiredAuthSession();

    const course = await getLessons({
        courseId: params.courseId,
        userId: session.user.id
    })

    if (!course) {
        notFound()
    }

    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Lessons - {course?.name}</LayoutTitle>
            </LayoutHeader>
            <LayoutContent className="flex flex-col gap-4 lg:flex-row">
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Lessons</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {course.lessons.map((lesson) => (
                            <LessonItem key={lesson.id} lesson={lesson} />
                        ))}
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    )
}