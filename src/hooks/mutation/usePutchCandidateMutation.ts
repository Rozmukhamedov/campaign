import { useMutation } from "react-query";
import { request } from "services/api";

export const usePutchCandidateMutation = ({ id }: { id: number }) => {
  return useMutation((data: any) => request.patch(`/candidates/${id}/`, data));
};
