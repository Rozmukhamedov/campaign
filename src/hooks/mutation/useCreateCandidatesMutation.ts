import { useMutation } from "react-query";
import { request } from "services/api";

export const useCreateCandidatesMutation = () => {
  return useMutation((data: any) => request.post(`/candidates/`, data));
};
