import { prisma } from "@/app/lib/prisma";

export const getLessons = async ({
    courseId,
    userId
}: {
    courseId: string;
    userId: string;
}) => {
    return await prisma.course.findFirst({
        where: {
            id: courseId,
            creatorId : userId
        },
        // take: 4,
        // skip: Math.max(0, userPage * 4),
        select: {
            id: true,
            name: true,
            lessons: true
        },
    });
};