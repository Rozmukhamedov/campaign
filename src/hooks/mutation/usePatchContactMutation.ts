import { useMutation } from "react-query";
import { request } from "services/api";

export const usePatchContactMutation = () => {
  return useMutation((data: any) => request.patch(`/election/sponsor/contact/person/delete`, data));
};
