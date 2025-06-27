"use client";

import Link from "next/link";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

export const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
  const { mutate: joinWorkspace, isPending } = useJoinWorkspace();
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onSubmit = () => {
    joinWorkspace(
      { param: { workspaceId }, json: { code: inviteCode } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col gap-2 lg:flex-row items-center justify-between">
          <Button
            className="w-full lg:w-fit"
            variant="secondary"
            type="button"
            asChild
            disabled={isPending}
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            size="lg"
            type="button"
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? "Joining..." : "Join Workspace"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
