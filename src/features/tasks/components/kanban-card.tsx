import { MoreHorizontal } from "lucide-react";

import { Task } from "@/features/tasks/types";
import { TaskActions } from "@/features/tasks/components/task-actions";
import DottedSeparator from "@/components/dotted-separator";
import { MemberAvatar } from "@/features/members/components/member-avatar";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white rounded p-2.5 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-70 transition" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex items-center gap-x-1.5">
        <MemberAvatar name={task.assignee.name} />
      </div>
    </div>
  );
};
