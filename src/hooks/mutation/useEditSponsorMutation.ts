import { useMutation } from "react-query";
import { request } from "services/api";

export const useEditSponsorMutation = () => {
  return useMutation(({ data, id }: { data: any; id: number }) =>
    request.patch(`/election/sponsors/${id}/`, data)
  );
};
