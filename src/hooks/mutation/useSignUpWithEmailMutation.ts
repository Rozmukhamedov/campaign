import { useMutation } from "react-query";
import { requestWithoutAuth } from "services/api";

export const useSignUpWithEmailMutation = () => {
  return useMutation((email: string) =>
    requestWithoutAuth.post(
      `/account/register/with/email/`,
      {},
      {
        params: {
          email,
        },
      }
    )
  );
};
