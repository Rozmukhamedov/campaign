import { useMutation } from "react-query";
import { request } from "services/api";

export const useCreateVotersInCandidate = () => {
  return useMutation((data: any) =>
    request.post(`/candidates/voter/for/candidate/create/`, data)
  );
};
