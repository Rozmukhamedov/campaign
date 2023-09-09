import Button from "components/Button/Button";
import CustomInput from "components/Input/Input";
import { FC, ReactNode } from "react";
import Logo from "assets/images/logo.svg";
import { useSignUpWithEmailMutation } from "../../hooks/mutation";
import toast from "react-hot-toast";

type FirstStageProps = {
  errors?: any;
  handleSubmit?: any;
  register?: any;
  setStepper?: any;
  AppleIcon?: any;
  ChromeIcon?: any;
  stepper?: boolean | string;
};

const FirstStage: FC<FirstStageProps> = ({
  errors,
  handleSubmit,
  register,
  setStepper,
  AppleIcon,
  ChromeIcon,
  stepper,
}) => {
  const SignUpWithEmailMutation = useSignUpWithEmailMutation();

  const onSubmit = handleSubmit((data: { email: string }, event?: Event) => {
    event?.preventDefault();

    const signUpWithEmail = SignUpWithEmailMutation.mutateAsync(data.email);
    signUpWithEmail
      .then((res) => {
        setStepper("second");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  });

  return (
    <>
      <img src={Logo} alt="My Campaign" />
      <div className="signup__form">
        <h2>Sign up</h2>
        {/* <div className="signup__buttons">
          <Button>
            <ChromeIcon />
            Continue with Google
          </Button>
          <Button>
            <AppleIcon />
            Continue with Apple
          </Button>
        </div> */}
        <form onSubmit={onSubmit}>
          <div className="input__field">
            <label>Email</label>
            <CustomInput
              name={"email"}
              type={"email"}
              register={register}
              placeholder="Enter your email address"
              invalid={errors.email?.type === "required" && true}
              required
            />
          </div>

          <Button type="submit" cursor="pointer">
            Continue with email
          </Button>
        </form>
      </div>
    </>
  );
};

export default FirstStage;
