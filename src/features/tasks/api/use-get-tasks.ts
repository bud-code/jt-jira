import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { TaskStatus } from "../types";

type ResponseType = InferResponseType<(typeof client.api.tasks)["$get"], 200>;

interface UseGetTaskProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
}

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  assigneeId,
  dueDate,
  search,
}: UseGetTaskProps) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["tasks", workspaceId, projectId, status, assigneeId, dueDate, search],
    queryFn: async () => {
      const response = await client.api.tasks["$get"]({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
          search: search ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get tasks");
      }

      return await response.json();
    },
  });

  return query;
};
