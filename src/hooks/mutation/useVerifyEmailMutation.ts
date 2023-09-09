import { useMutation } from "react-query";
import { requestWithoutAuth } from "services/api";

export const useVerifyEmailMutation = () => {
  return useMutation(({ email, code }: { email: string; code: string }) =>
    requestWithoutAuth.post(
      `/account/verify/account/`,
      {},
      {
        params: {
          email,
          code,
        },
      }
    )
  );
};
