interface PageProps {
    params: Promise<{ credentialId: string }>;
}
import { requireAuth } from "@/lib/auth-utils";

const Page = async ({ params }: PageProps) => {
    const { credentialId } = await params;
    await requireAuth();
    return <p>Credential id: {credentialId}</p>;
};

export default Page;
