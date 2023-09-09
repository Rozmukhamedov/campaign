import { useMutation } from "react-query";
import { request } from "services/api";

export const useCreateTransactionMutation = () => {
  return useMutation((data: any) =>
    request.post(`/election/transactions/create/`, data)
  );
};
