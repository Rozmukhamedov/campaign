import { useMutation } from "react-query";
import { request } from "services/api";

export const usePatchVoterMutation = ({ id }: { id: number }) => {
  return useMutation((data: any) => request.patch(`/voters/${id}/`, data));
};
