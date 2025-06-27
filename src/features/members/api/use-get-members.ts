import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.members)["$get"], 200>;

interface UseGetMembersProps {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client.api.members["$get"]({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to get members");
      }

      return await response.json();
    },
  });

  return query;
};
