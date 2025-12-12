interface PageProps {
    params: Promise<{ workflowId: string }>;
}
import { requireAuth } from "@/lib/auth-utils";

const Page = async ({ params }: PageProps) => {
    const { workflowId } = await params;
    await requireAuth();
    return <p>Workflow id: {workflowId}</p>;
};

export default Page;
