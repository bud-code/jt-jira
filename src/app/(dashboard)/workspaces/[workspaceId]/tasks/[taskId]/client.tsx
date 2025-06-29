"use client";

import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { useTaskId } from "@/features/projects/hooks/use-task-id";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";

export const TaskIdPageClient = () => {
  const taskId = useTaskId();

  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId });

  if (isLoadingTask) return <PageLoader />;

  if (!task) return <PageError message="Task not found" />;

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={task.data.project} task={task.data} />
    </div>
  );
};
