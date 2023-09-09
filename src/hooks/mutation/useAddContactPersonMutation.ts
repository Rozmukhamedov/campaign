import { useMutation } from "react-query";
import { request } from "services/api";

export const useAddContactPersonMutation = () => {
  return useMutation((data: any) => request.post(`/election/sponsor/contact/person/create`, data));
};
