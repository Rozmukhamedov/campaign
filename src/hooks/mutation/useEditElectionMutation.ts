import { useMutation } from "react-query";
import { request } from "services/api";

export const useEditElectionMutation = () => {
  return useMutation(({ data, id }: { data: any; id: number }) =>
    request.patch(`/election/patch/${id}/`, data)
  );
};
