import "./styless.css";
import toast from "react-hot-toast";
import { Input } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import { usePatchEmailMutation, useVerifyEmailMutation } from "hooks/mutation";
import { ReactComponent as TracedIcon } from "assets/images/Traced.svg";

const ChangeMail = ({ setOnChangeMail }: any) => {
  const [nextStep, setNextStep] = useState(false);
  const [emailState, setEmailState] = useState("");
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const formCode = useForm({
    validateInputOnChange: true,
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) => (value.length < 4 ? "true" : null),
    },
  });

  const useEditEmail = usePatchEmailMutation();
  const SendEmailSubmit = (e: any) => {
    const editEmail = useEditEmail.mutateAsync(e.email);
    editEmail
      .then((res: any) => {
        if (res.status == 200) {
          setNextStep(true);
          setEmailState(e.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const useVerifyEmail = useVerifyEmailMutation();
  const SendCodeSubmit = (e: any) => {
    const verifyWithEmail = useVerifyEmail.mutateAsync({
      email: emailState,
      code: e?.code,
    });
    verifyWithEmail
      .then((res) => {
        setOnChangeMail("close");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        console.log(err, "err");
      });
  };

  return (
    <div className="changemail">
      <h2>ChangeMail</h2>
      <hr className="hr" />
      <div>
        <form
          className="changemail__email"
          onSubmit={form.onSubmit(SendEmailSubmit)}
        >
          <p>Email</p>
          <div className="changemail__email-position">
            <Input
              invalid={form.getInputProps("email").error}
              variant="filled"
              placeholder="Type your e-mail"
              radius="md"
              size="md"
              {...form.getInputProps("email")}
            />
            <Button
              type={"submit"}
              className={
                !!form.getInputProps("email").error ? "disabled" : "active"
              }
              disabled={!!form.getInputProps("email").error}
            >
              <TracedIcon />
            </Button>
          </div>
        </form>

        <form
          onSubmit={formCode.onSubmit(SendCodeSubmit)}
          className="changemail__info"
        >
          {nextStep ? (
            <>
              <p>
                We just sent you a temporary sign up code. Please check your
                inbox and paste the sign up code below.
              </p>
              <p>Code</p>
              <Input
                type="text"
                invalid={formCode.getInputProps("code").error}
                variant="filled"
                placeholder="Type code"
                radius="md"
                size="md"
                {...formCode.getInputProps("code")}
              />
            </>
          ) : null}

          <div className="changemail__btn-save">
            <Button
              disabled={!nextStep}
              background={nextStep ? "#1C54FC" : "#9D9D9D"}
              type={"submit"}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeMail;
