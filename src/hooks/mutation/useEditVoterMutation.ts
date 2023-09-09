import { useMutation } from "react-query";
import { request } from "services/api";

export const useEditVoterMutation = () => {
  return useMutation(({ data, id }: { data: any; id: number }) =>
    request.patch(`/voters/${id}/`, data)
  );
};
