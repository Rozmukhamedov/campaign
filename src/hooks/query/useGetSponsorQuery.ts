import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetSponsorQuery = ({
  page,
  election,
  enabled,
  id
}: {
  page?: number;
  election: number;
  enabled: boolean;
  id: number
}) => {
  return useQuery(
    ["use-get-sponsor", election, id],
    async () => {
      const { data } = await request.get(`/election/sponsors/${id}`, {
        params: { page, election },
      });
      return data;
    },
    { enabled: enabled }
  );
};
