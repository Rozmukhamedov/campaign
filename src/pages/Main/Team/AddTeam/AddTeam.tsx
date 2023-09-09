import "./style.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { request } from "services/api";
import { useForm } from "@mantine/form";
import React, { FormEvent } from "react";
import Button from "components/Button/Button";
import { getBase64File } from "utils/general";
import closeIcon from "assets/images/closeicon.svg";
import { FileButton, Grid, TextInput } from "@mantine/core";
import { useElectionContext } from "context/ElectionContext";

type AddTeamProps = {
  setChangeTeam: any;
};

const AddTeam: React.FC<AddTeamProps> = ({ setChangeTeam }) => {
  const [file, setFile] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { electionId } = useElectionContext();
  const [formImg, setFormImg] = useState<any>();
  const formData = new FormData();

  const form = useForm({
    initialValues: {
      telegram: "",
      whatsapp: "",
      facebook: "",
      email: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
    },

    validate: {
      firstname: (value) => (value.length < 2 ? "First name" : null),
      lastname: (value) => (value.length < 2 ? "Last name" : null),
      // telegram: (value) => (value.length < 2 ? "Telegram" : null),
      // whatsapp: (value) => (value.length < 2 ? "WhatsApp" : null),
      // facebook: (value) => (value.length < 2 ? "Facebook" : null),
      // email: (value) => (value.length < 2 ? "Email address" : null),
      // phonenumber: (value) =>
      //     value.length < 2 ? "phonenumber  must have at 2" : null,
    },
  });

  const handleTeamCreateSubmit = async (
    values: any,
    event: FormEvent<HTMLFormElement>
  ) => {
    setLoading(true);
    formData.append("first_name", values.firstname);
    formData.append("last_name", values.lastname);
    formData.append("phone_number", values.phonenumber);
    formData.append("telegram", values.telegram);
    formData.append("facebook", values.facebook);
    formData.append("whatsapp", values.whatsapp);
    formData.append("email", values.email);
    (await formImg) && formData.append("image", formImg);
    await formData.append("election", electionId);

    request
      .post("/team/create/", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Created successfully");
        setLoading(false);
        form.reset();
        setChangeTeam("team");
      })
      .catch((err) => {
        toast.error(err?.response?.statusText);
        setLoading(false);
      });
  };
  const onFileChange = (file: any) => {
    setFormImg(file);
    getBase64File(file).then((res) => {
      setFile(res);
    });
  };

  return (
    <div className="addteam">
      <div className="addteam__top">
        <h2>Add teammate</h2>
        <img
          onClick={() => setChangeTeam("team")}
          src={closeIcon}
          alt="closeIcon"
        />
      </div>
      <div className="addteam__photo">
        <p>Photo</p>
        <div className="addteam__download-img">
          <FileButton onChange={onFileChange} accept="">
            {(props) => <Button {...props}>Choose photo</Button>}
          </FileButton>
          {/* /* props src={file}* / */}
          {file && <img src={file} alt="voter-photo" />}
        </div>
      </div>
      <div className="addteamsoc__form">
        <form
          onSubmit={form.onSubmit(handleTeamCreateSubmit)}
          className="addteamsoc__form-control"
        >
          <TextInput
            label="First name"
            placeholder="First name..."
            {...form.getInputProps("firstname")}
          />
          <TextInput
            label="Last name"
            placeholder="Last name"
            {...form.getInputProps("lastname")}
          />
          <TextInput
            type="number"
            placeholder="Your phone"
            label="Phone"
            {...form.getInputProps("phonenumber")}
          />
          <p>Social media</p>
          <Grid gutter="sm">
            <Grid.Col span={6}>
              <TextInput
                placeholder="Telegram"
                {...form.getInputProps("telegram")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                placeholder="WhatsApp"
                {...form.getInputProps("whatsapp")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Facebook"
                {...form.getInputProps("facebook")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                type="email"
                placeholder="Your email"
                {...form.getInputProps("email")}
              />
            </Grid.Col>
          </Grid>
          <div className="addteam-btn">
            <Button loading={loading} type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
