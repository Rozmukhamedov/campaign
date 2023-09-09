import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetElectionQuery = ({
  page,
  userId,
  enabled,
}: {
  page: number;
  userId?: number;
  enabled?: boolean;
}) => {
  return useQuery(
    ["get-elections-list", page, userId],
    async () => {
      const { data } = await request.get(`/election/`, {
        params: { page },
      });
      return data;
    },
    { enabled: enabled }
  );
};
