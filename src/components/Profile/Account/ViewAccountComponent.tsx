import "./styless.css";
import { FC, useEffect, useState } from "react";
import { FileButton, Input } from "@mantine/core";
import ChangeMail from "./ChangeMail";
import Button from "components/Button/Button";
import { useEditAccountMutation } from "hooks/mutation";
import { removeCookie } from "utils/cookie";
import { getBase64File } from "utils/general";
import { useGetAccountQuery } from "hooks/query/useGetAccountQuery";
import { queryClient } from "services/accountAPI";

type ViewAccountProps = {
  onChangeMail: any;
  setOnChangeMail: any;
  view: any;
  setOpened: any
};

const ViewAccountComponent: FC<ViewAccountProps> = ({
  onChangeMail,
  setOnChangeMail,
  view,
  setOpened
}) => {
  const useEditAccount = useEditAccountMutation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<string>("");
  const [formImg, setFormImg] = useState<any>();
  const formData = new FormData();
  const [emailShow, setEmailShow] = useState<any>(
    JSON.parse(localStorage.getItem("user") || "{}") || {}
  );

  const userInfo = useGetAccountQuery({ page: 1, enabled: view === "account" });

  useEffect(() => {
    setName(userInfo.data?.first_name);
    setSurname(userInfo.data?.last_name);
  }, [userInfo.isSuccess]);

  const onSubmit = (e: any) => {
    formData.append("first_name", name);
    formData.append("last_name", surname);
    formData.append("password", password);
    formImg && formData.append("image", formImg);

    const editAccount = useEditAccount.mutateAsync(formData);
    editAccount
      .then((res) => {
        if (password.length > 0) {
          removeCookie("token");
          removeCookie("refresh_token");
          removeCookie("user");
          localStorage.clear();
          window.location.reload();
          return
        }
        queryClient.refetchQueries("use-get-account-user");
        setOpened(false)
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const onFileChange = (file: any) => {
    setFormImg(file);
    getBase64File(file).then((res) => {
      setFile(res);
    });
  };

  return (
    <>
      {onChangeMail == "changemail" ? (
        <ChangeMail setOnChangeMail={setOnChangeMail} />
      ) : (
        <div className="Profile__sidebar-right">
          <h2>Account</h2>
          <hr className="hr" />
          <div className="sidebar__photo">
            <div>
              <p>Photo</p>
              <FileButton onChange={onFileChange} accept="">
                {(props) => <Button {...props}>Choose photo</Button>}
              </FileButton>
            </div>
            {file && <img src={file} alt="sidebar__photo-photo" />}
          </div>
          <hr className="hr" />
          <div className="personal__info">
            <p>Personal info</p>
            <div className="personal__btns">
              <Button>{emailShow.email}</Button>
              <p
                className="change__email"
                onClick={() => setOnChangeMail("changemail")}
              >
                Change email
              </p>
            </div>
            <div className="sidbar__form">
              <p>First name</p>
              <Input
                defaultValue={name}
                variant="filled"
                placeholder="Type your first name"
                radius="md"
                size="md"
                onChange={(e: any) => setName(e.target.value)}
              />
              <p>Last name</p>
              <Input
                value={surname}
                variant="filled"
                placeholder="Type your last name"
                radius="md"
                size="md"
                onChange={(e: any) => setSurname(e.target.value)}
              />
              <p>Your password</p>
              <Input
                variant="filled"
                placeholder="Type your password"
                radius="md"
                size="md"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            {/* <hr className="hr" />
            <p>Security</p>
            <div className="personal__btns">
              <Button>*******************</Button>
              <p
                className="change__email"
                onClick={() => setOnChangeMail("changemail")}
              >
                Change password
              </p>
            </div> */}
            <div className="sidebar__btn-save">
              <Button type="button" onClick={onSubmit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAccountComponent;
