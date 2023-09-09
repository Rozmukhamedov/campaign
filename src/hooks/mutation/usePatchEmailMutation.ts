import { useMutation } from "react-query";
import { request } from "services/api";

export const usePatchEmailMutation = () => {
  return useMutation((email: string) =>
    request.post(
      `/account/email/change/`,
      {},
      {
        params: {
          email,
        },
      }
    )
  );
};
