"use client";

import { useQueryState } from "nuqs";
import { Loader, PlusIcon } from "lucide-react";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DateFilters } from "@/features/tasks/components/data-filters";
import { DataTable } from "@/features/tasks/components/data-table";
import { columns } from "@/features/tasks/components/columns";
import { DataKanban } from "@/features/tasks/components/data-kanban";

export const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const workspaceId = useWorkspaceId();

  const [{ projectId, status, assigneeId, search, dueDate }] = useTaskFilters();
  const { open } = useCreateTaskModal();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    status,
    assigneeId,
    search,
    dueDate,
  });

  return (
    <Tabs className="flex-1 w-full border rounded-lg" value={view} onValueChange={setView}>
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button className="w-full lg:w-auto" size="sm" onClick={open}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DateFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.data.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban data={tasks?.data.documents ?? []} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              Data calendar
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
