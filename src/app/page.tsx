import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Page = () => {

  return (
    <div className={cn("text-red-500 font-extrabold justify-center flex items-center h-screen")}>
      <Button variant="secondary">Click me</Button>
    </div>

  );
};

export default Page;