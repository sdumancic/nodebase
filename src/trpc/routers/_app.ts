import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/database';

export const appRouter = createTRPCRouter({
    testAI: protectedProcedure
        .mutation(async ({ ctx }) => {
            await inngest.send({
                name: "execute/ai",
            });
            return { success: true, message: "AI sent" };
        }),
    getWorkflows: protectedProcedure
        .query(({ ctx }) => {
            return prisma.workflow.findMany();
        }),
    createWorkflow: protectedProcedure
        .mutation(async ({ ctx }) => {

            await inngest.send({
                name: "test/hello.world",
                data: {
                    email: "asdsadad"
                }
            });
            return { success: true, message: "Workflow created" };
        }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
