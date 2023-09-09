import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetSponsorsQuery = ({
  page,
  election,
  status,
  main,
  enabled,
}: {
  page?: number;
  election: number;
  status?: any;
  main?: any;
  enabled: boolean;
}) => {
  return useQuery(
    ["use-get-sponsors", election],
    async () => {
      const { data } = await request.get(`/election/sponsors/`, {
        params: { page, election, status, main },
      });
      return data;
    },
    { enabled: enabled }
  );
};
