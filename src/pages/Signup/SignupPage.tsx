import "./style.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as AppleIcon } from "assets/images/apple.svg";
import { ReactComponent as ChromeIcon } from "assets/images/chrome.svg";

import FirstStage from "components/Signup/FirstStage";
import SecondStage from "components/Signup/SecondStage";
import ThirdStage from "components/Signup/ThirdStage";
import FourthStage from "components/Signup/FourthStage";

function SignupPage() {
  const [stepper, setStepper] = useState<any>(
    !!localStorage.getItem("regStep")
      ? localStorage.getItem("regStep")
      : "first"
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  return (
    <div className="signup">
      {stepper == "first" ? (
        <FirstStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          setStepper={setStepper}
          AppleIcon={AppleIcon}
          ChromeIcon={ChromeIcon}
        />
      ) : stepper == "second" ? (
        <SecondStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          getValues={getValues}
          setStepper={setStepper}
          AppleIcon={AppleIcon}
          ChromeIcon={ChromeIcon}
        />
      ) : stepper == "third" ? (
        <ThirdStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          setValue={setValue}
          setStepper={setStepper}
        />
      ) : stepper == "fourth" ? (
        <FourthStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          setStepper={setStepper}
        />
      ) : null}
    </div>
  );
}

export default SignupPage;
