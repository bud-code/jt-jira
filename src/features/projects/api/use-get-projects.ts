import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.projects)["$get"], 200>;

interface UseGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects["$get"]({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to get projects");
      }

      return await response.json();
    },
  });

  return query;
};
