import { useMutation } from "react-query";
import { request } from "services/api";

export const useCreateSponsorMutation = () => {
  return useMutation((data: any) => request.post(`/election/sponsors/`, data));
};
