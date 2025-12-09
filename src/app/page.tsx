"use client"
import { cn } from "@/lib/utils";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())

  const create = useMutation({
    ...trpc.createWorkflow.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trpc.getWorkflows.queryOptions().queryKey });
      toast.success("Job queued");
    },
  });

  return (
    <div className={cn("min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6")}>
      protected server component
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
    </div>

  );
};

export default Page;