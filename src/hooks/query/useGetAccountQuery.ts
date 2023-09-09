import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetAccountQuery = ({ page, enabled }: { page?: number, enabled?: any }) => {
  return useQuery(
    ["use-get-account-user"],
    async () => {
      const { data } = await request.get(`/account/user/account/`, {
        params: { page },
      });
      return data;
    },
    { enabled: enabled }
  );
};
