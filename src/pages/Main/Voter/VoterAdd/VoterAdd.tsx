import "./style.css";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import closeIcon from "assets/images/closeicon.svg";
import { FileButton, Button, TextInput, Select } from "@mantine/core";
import { useAddVoterContext } from "context/AddVoterContext";
import { getBase64File } from "utils/general";

type VoterAddProps = {
  setOpenGrid: boolean | any;
};

const VoterAdd: React.FC<VoterAddProps> = ({ setOpenGrid }) => {
  const [file, setFile] = useState<any>(null);
  const [formImg, setFormImg] = useState<any>(null);
  const {
    setFirst_name,
    setLast_name,
    setOrganization,
    setPhone_number,
    setImage,
    setContinent,
    setCountry,
  } = useAddVoterContext();

  const onFileChange = (file: any) => {
    setFormImg(file);
    getBase64File(file).then((res) => {
      setFile(res);
    });
  };

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      organization: "",
      country: "",
      continent: "",
    },

    validate: {
      firstname: (value) =>
        value.length < 2 ? "First name must have" : null,
      lastname: (value) =>
        value.length < 2 ? "Last name must have" : null,
      continent: (value) =>
        value.length < 2 ? "Continent must have" : null,
      country: (value) =>
        value.length < 2 ? "Country must have" : null,

      // phone: (value) =>
      //   value.length < 2 ? "Phone must have at least 7 numbers" : null,
    },
  });

  const nextStep = (e: any) => {
    setImage(formImg);
    setFirst_name(e.firstname);
    setLast_name(e.lastname);
    setOrganization(e.organization);
    setPhone_number(e.phone);
    setContinent(e.continent);
    setCountry(e.country);
    setOpenGrid("addvoter-socmedia");
  };

  return (
    <div className="votteradd__wrapper">
      <div className="voteradd__top">
        <h2>Add voter</h2>
        <img onClick={setOpenGrid} src={closeIcon} alt="Close" />
      </div>
      <div className="voteradd__info">
        <div className="voteradd__photo">
          <p>Photo</p>
          <div className="voteradd__download-img">
            <FileButton onChange={onFileChange} accept="">
              {(props) => <Button {...props}>Choose photo</Button>}
            </FileButton>
            {/* /* props src={file}* / */}
            {file && <img src={file} alt="voter-photo" />}
          </div>
        </div>
        <div className="voteradd__form">
          <form onSubmit={form.onSubmit(nextStep)}>
            <TextInput
              label="First name"
              placeholder="First name"
              {...form.getInputProps("firstname")}
            />
            <TextInput
              label="Last name"
              placeholder="Last name"
              {...form.getInputProps("lastname")}
            />
            <TextInput
              label="Phone number"
              placeholder="+998900028833"
              {...form.getInputProps("phone")}
            />
            <TextInput
              placeholder="Organization"
              label="Organization"
              {...form.getInputProps("organization")}
              required={false}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Select
                label="Continent"
                placeholder="Continent"
                data={[
                  "Asia",
                  "Europe",
                  "Australia",
                  "Africa",
                  "South America",
                  "North America",
                ]}
                {...form.getInputProps("continent")}
                style={{ marginRight: "5px" }}
              />
              <TextInput
                placeholder="Сountry"
                label="Сountry"
                {...form.getInputProps("country")}
                required={false}
                style={{ marginLeft: "5px" }}
              />
            </div>
            <Button type="submit">Next</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoterAdd;
