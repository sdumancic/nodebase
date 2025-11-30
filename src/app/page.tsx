import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import prisma from "@/lib/database";

const Page = async () => {

  const users = await prisma.user.findMany();
  return (
    <div className={cn("justify-center flex items-center h-screen")}>
      {JSON.stringify(users)}
    </div>

  );
};

export default Page;