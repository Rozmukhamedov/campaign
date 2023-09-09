import Button from "components/Button/Button";
import CustomInput from "components/Input/Input";
import { useEditAccountMutation } from "hooks/mutation";
import Logo from "assets/images/logo.svg";
import { setStorage } from "utils/helpers/local-storage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type FirstStageProps = {
  errors?: any;
  handleSubmit?: any;
  register?: any;
  setStepper?: any;
  AppleIcon?: any;
  stepper?: any;
};

function FourthStage({
  errors,
  handleSubmit,
  register,
}: FirstStageProps) {
  const useEditAccount = useEditAccountMutation();
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    const formData = new FormData();
    formData.append("first_name", e.first_name);
    formData.append("last_name", e.last_name);
    formData.append("organization", e.organization);
    formData.append("goal", "");

    const editAccount = useEditAccount.mutateAsync(formData);
    editAccount
      .then((res) => {
        localStorage.removeItem("regStep");
        setStorage("user", JSON.stringify(res.data));
        toast.success("You are successfully logged in");
        navigate("/election");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <>
      <img src={Logo} alt="My Campaign" />{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signup__form">
          <h3 style={{ marginBottom: "30px" }}>
            Tell us about yourself <br />
            <span>this will be useful in future work</span>
          </h3>
          <div className="input__field">
            <label>First name</label>
            <CustomInput
              name={"first_name"}
              type={"text"}
              register={register}
              placeholder="Enter your first name"
              invalid={errors.first_name?.type === "required" && true}
              required
            />
          </div>
          <div className="input__field">
            <label>Last name</label>
            <CustomInput
              name={"last_name"}
              type={"text"}
              register={register}
              placeholder="Enter your last name"
              invalid={errors.last_name?.type === "required" && true}
              required
            />
          </div>

          <div className="input__field">
            <label>Organization</label>
            <CustomInput
              name={"organization"}
              type={"text"}
              register={register}
              placeholder="Enter your organization"
              invalid={errors.organization?.type === "required" && true}
              required
            />
          </div>

          <Button type={"submit"}>Continue</Button>
        </div>
      </form>
    </>
  );
}

export default FourthStage;
