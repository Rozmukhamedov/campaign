import {useState} from "react";
import Logo from "assets/images/logo.svg";
import {Group, Text} from "@mantine/core";
import {Dropzone} from "@mantine/dropzone";
import Button from "components/Button/Button";
import {MdDeleteOutline} from "react-icons/md";
import CustomInput from "components/Input/Input";
import {getBase64File} from "../../utils/general";
import {useEditAccountMutation} from "hooks/mutation";

type ThirdStageProps = {
    errors?: any;
    handleSubmit?: any;
    register?: any;
    setStepper?: any;
    AppleIcon?: any;
    ChromeIcon?: any;
    stepper?: boolean | string;
    setValue?: any;
};

function ThirdStage({
                        errors,
                        handleSubmit,
                        register,
                        setStepper,
                        setValue,
                    }: ThirdStageProps) {
    const useEditAccount = useEditAccountMutation();
    const [file, setFile] = useState("");

    const onSubmit = (e: any) => {
        const formData = new FormData();
        formData.append("password", e.password);
        formData.append("image", e.image);
        const editAccount = useEditAccount.mutateAsync(formData);
        editAccount
            .then((res) => {
                setStepper("fourth");
                localStorage.setItem("regStep", "fourth");
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    const handleDropProfileImg = (e: any) => {
        getBase64File(e[0]).then((res) => {
            setFile(res);
        });
        setValue("image", e[0]);
    };

    return (
        <>
            <img src={Logo} alt="My Campaign"/>
            <div className="signup__form">
                <h3>Welcome to MyCampaign</h3>
                <h4 style={{marginBottom: 20}}>First things first, tell us a bit about yourself</h4>
                {/*{file ? (*/}
                {/*  <div className="avatar_sign_up_img">*/}
                {/*    <div onClick={() => setFile("")} className="close_img_icon">*/}
                {/*      <MdDeleteOutline />*/}
                {/*    </div>*/}
                {/*    <img width={85} height={85} src={file} alt="" />*/}
                {/*  </div>*/}
                {/*) : (*/}
                {/*  <Dropzone*/}
                {/*    style={{*/}
                {/*      width: "85px",*/}
                {/*      height: "85px",*/}
                {/*      margin: "32px auto 20px auto",*/}
                {/*      textAlign: "center",*/}
                {/*    }}*/}
                {/*    className="upload__file"*/}
                {/*    onDrop={handleDropProfileImg}*/}
                {/*    onReject={(files) => console.log("rejected files", files)}*/}
                {/*    maxSize={3 * 1024 ** 2}*/}
                {/*    // accept={IMAGE_MIME_TYPE}*/}
                {/*    // {...props}*/}
                {/*  >*/}
                {/*    <Group*/}
                {/*      position="center"*/}
                {/*      spacing="xl"*/}
                {/*      style={{ minHeight: 20, pointerEvents: "none" }}*/}
                {/*    >*/}
                {/*      <div>*/}
                {/*        <Text size="sm" color="dimmed" inline mt={7}>*/}
                {/*          Add <br /> a photo*/}
                {/*        </Text>*/}
                {/*      </div>*/}
                {/*    </Group>*/}
                {/*  </Dropzone>*/}
                {/*)}*/}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input__field">
                        <label>Set a password</label>
                        <CustomInput
                            name={"password"}
                            type={"password"}
                            register={register}
                            placeholder="Enter your password"
                            invalid={errors.password?.type === "required" && true}
                            required
                        />
                    </div>
                    <div className="input__field">
                        <label>Re-enter the password</label>
                        <CustomInput
                            name={"repassword"}
                            type={"password"}
                            register={register}
                            placeholder="Enter your re-password"
                            invalid={errors.password?.type === "required" && true}
                            required
                        />
                    </div>

                    <Button type={"submit"}>Continue</Button>
                </form>
            </div>
        </>
    );
}

export default ThirdStage;
