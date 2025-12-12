interface PageProps {
    params: Promise<{ executionId: string }>;
}
import { requireAuth } from "@/lib/auth-utils";

const Page = async ({ params }: PageProps) => {
    const { executionId } = await params;
    await requireAuth();
    return <p>Execution id: {executionId}</p>;
};

export default Page;
