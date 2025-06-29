import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { EditTaskForm } from "./edit-task-form";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

const EditTaskFormWrapper = ({ onCancel, id }: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });
  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId: id });

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  const projectOptions = projects?.data.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.data.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size=5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!task) return null;

  return (
    <EditTaskForm
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      onCancel={onCancel}
      initialValues={task.data}
    />
  );
};

export default EditTaskFormWrapper;
