import { useQuery } from "react-query";
import { request } from "services/api";

export const useTransactionsDetail = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery(
    ["use-get-transactions-detail", id],
    async () => {
      const { data } = await request.get(
        `/election/transactions/retrieve/${id}/`
      );
      return data;
    },
    {
      enabled: enabled,
    }
  );
};
