import { useMutation } from "react-query";
import { requestWithoutAuth } from "services/api";

export const useEditEmailMutation = () => {
  return useMutation((email: string) =>
    requestWithoutAuth.post(
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
