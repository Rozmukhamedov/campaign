import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetTeamWithChoosingQuery = ({
  page,
  election,
  query,
}: {
  page: number;
  election: number;
  query?: string;
}) => {
  return useQuery(
    ["use-get-team-with-choosing-query", page, election, query],
    async () => {
      const { data } = await request.get(`/team/choose/`, {
        params: { page, election, query },
      });
      return data;
    }
  );
};
