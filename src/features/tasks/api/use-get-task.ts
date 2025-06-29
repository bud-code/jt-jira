import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.tasks)[":taskId"]["$get"], 200>;

interface UseGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"]["$get"]({ param: { taskId } });

      if (!response.ok) {
        throw new Error("Failed to get tasks");
      }

      return await response.json();
    },
  });

  return query;
};
