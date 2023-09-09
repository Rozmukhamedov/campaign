import { useMutation } from "react-query";
import { request } from "services/api";

export const useEditAccountMutation = () => {
  return useMutation((data: any) =>
    request.patch(`/account/user/account/`, data)
  );
};
