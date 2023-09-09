import "./style.css";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useEditVoterMutation } from "hooks/mutation";
import { FileButton, Button, TextInput, Select } from "@mantine/core";
import closeIcon from "assets/images/closeicon.svg";
import { getBase64File } from "utils/general";
import { useVoterGetIdQuery } from "hooks/query";
import qs from "qs";
import { useLocation } from "react-router-dom";
import { useAddVoterContext } from "../../../../context/AddVoterContext";

type VoterEditProps = {
  setOpenGrid: boolean | any;
};
const VoterEdit: React.FC<VoterEditProps> = ({ setOpenGrid }) => {
  const [file, setFile] = useState<string>();
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const [formImg, setFormImg] = useState<any>();
  const voterGetById = useVoterGetIdQuery({ id: Number(query.voterId) });
  const voterData = voterGetById.data;

  const {
    setFirst_name,
    setLast_name,
    setOrganization,
    setPhone_number,
    setImage,
    setTelegram,
    setFacebook,
    setWhatsapp,
    setInstagram,
    setEmail,
    setStatus,
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
      telegram: "",
      instagram: "",
      whatsapp: "",
      facebook: "",
      email: "",
      image: "",
      continent: "",
      country: "",
    },
    validate: {
      firstname: (value: string) =>
        value.length < 2 ? "First name must have at least 2 letters" : null,
      lastname: (value: string) =>
        value.length < 2 ? "Last name must have at least 2 letters" : null,

      // organization: (value: string) =>
      //   value.length < 2 ? " have at least 2 letters" : null,
      // phone: (value: string) =>
      //   value.length < 2 ? "Phone must have at least 2 letters" : null,
    },
  });

  useEffect(() => {
    form.setValues({
      firstname: voterData?.first_name,
      lastname: voterData?.last_name,
      phone: voterData?.social_contacts?.phone_number,
      organization: voterData?.organization,
      telegram: voterData?.social_contacts?.telegram,
      instagram: voterData?.social_contacts?.instagram,
      whatsapp: voterData?.social_contacts?.whatsapp,
      facebook: voterData?.social_contacts?.facebook,
      email: voterData?.social_contacts?.email,
      continent: voterData?.continent,
      country: voterData?.country,
      image: formImg,
    });
  }, [voterGetById.isSuccess]);

  const nextStep = (e: any) => {
    setImage(formImg);
    setFirst_name(e.firstname);
    setLast_name(e.lastname);
    setOrganization(e.organization);
    setPhone_number(e.phone);
    setOpenGrid("editvoter-socmedia");
    setTelegram(e?.social_contacts?.telegram);
    setFacebook(e?.social_contacts?.facebook);
    setWhatsapp(e?.social_contacts?.whatsapp);
    setEmail(e?.social_contacts?.email);
    setInstagram(e?.social_contacts?.instagram);
    setStatus(e?.status);
    setContinent(e?.continent);
    setCountry(e?.country);
  };

  return (
    <div className="votteredit__wrapper">
      <div className="voteredit__top">
        <h2>
          {voterData?.first_name} {voterData?.last_name}
        </h2>
        <img onClick={setOpenGrid} src={closeIcon} alt="Close" />
      </div>
      <div className="voteredit__info">
        <div className="voteradd__photo">
          <p>Photo</p>
          <div className="voteredit__download-img">
            <FileButton onChange={onFileChange} accept="">
              {(props) => <Button {...props}>Choose photo</Button>}
            </FileButton>
            {/* /* props src={file}* / */}

            {!!voterData?.image && !file ? (
              <img src={voterData?.image} alt="" />
            ) : null}
            {file ? <img src={file} alt="" /> : null}
          </div>
        </div>
        <div className="voteredit__form">
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
              // type="number"
              placeholder="Your phone"
              label="Phone"
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Organization"
              placeholder="Organization"
              {...form.getInputProps("organization")}
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
            <div className="voteredit__btn-next">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoterEdit;
