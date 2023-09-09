import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetTransactionsQuery = ({
  page,
  election,
  status,
  sponsor,
  year,
  month,
  type_transaction,
  enabled,
  dailiy
}: {
  page?: number;
  election?: number;
  status?: any;
  sponsor?: number;
  year?: any;
  month?: string;
  type_transaction?: string;
  enabled: any;
  dailiy?: any
}) => {
  return useQuery(
    [
      "use-get-transactions",
      election,
      status,
      sponsor,
      year,
      month,
      type_transaction,
      page,
      dailiy
    ],
    async () => {
      const { data } = await request.get(`/election/transactions/`, {
        params: {
          page,
          election,
          status,
          sponsor,
          year,
          month,
          type_transaction,
          dailiy
        },
      });
      return data;
    },
    { enabled: enabled }
  );
};
