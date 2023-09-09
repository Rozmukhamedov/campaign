import { useMutation } from "react-query";
import { request } from "services/api";

export const useDeleteVoterForCandidate = () => {
  return useMutation((data: any) => request.patch(`/candidates/voter/for/candidate/delete/`, data));
};
