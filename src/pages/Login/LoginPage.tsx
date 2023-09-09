import "./style.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { setCookie } from "utils/cookie";
import { useForm } from "react-hook-form";
import Logo from "assets/images/logo.svg";
import CustomInput from "components/Input";
import Button from "components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "hooks/mutation";
import { setStorage } from "utils/helpers/local-storage";
import { ReactComponent as AppleIcon } from "assets/images/apple.svg";
import { ReactComponent as ChromeIcon } from "assets/images/chrome.svg";

function LoginPage() {
  const [stepper, setStepper] = useState(false);
  const navigate = useNavigate();
  const useVerifyEmail = useVerifyEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextStep = () => {
    setStepper(true);
  };

  const onSubmit = (data: any) => {
    const verifyWithEmail = useVerifyEmail.mutateAsync(data);
    verifyWithEmail
      .then((res) => {
        setCookie("token", res?.data?.access);
        setCookie("refresh_token", res?.data?.refresh);

        toast.success("You are successfully logged in");

        setStorage("user", JSON.stringify(res.data?.user));
        setStepper(true);

        navigate("/election");
      })
      .catch((err) => {
        toast.error("Please check your email or password");
      });
  };

  return (
    <div className="login">
       <img src={Logo} alt="My Campaign" />
      <div className="login__form">
        <h2>Log in</h2>
        {/* <div className="login__buttons">
          <Button>
            <ChromeIcon />
            Continue with Google
          </Button>
          <Button cursor={"pointer"}>
            <AppleIcon />
            Continue with Apple
          </Button>
        </div> */}
        {stepper ? (
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="input__field" style={{ marginTop: "23px" }}>
              <label className="input__password">Password</label>
              <CustomInput
                name={"code"}
                type={"password"}
                register={register}
                placeholder="Enter your password"
                invalid={errors.code?.type === "required" && true}
                required
              />
            </div>
            <Button cursor={"pointer"} type={"submit"}>
              Continue with email
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(nextStep)}>
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
            <Button cursor={"pointer"} type={"submit"}>
              Continue with email
            </Button>
          </form>
        )}

        <div className="login__new-register">
          <h5>Haven't signed up yet?</h5>
          <Link to="/signup">
            <Button cursor={"pointer"}>Sign up here</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
