import React, { useEffect, useState } from "react";
import "./style.css";
import closeIcon from "assets/images/closeicon.svg";
import { useForm } from "@mantine/form";
import { Button, TextInput, Grid } from "@mantine/core";
import { useEditVoterMutation } from "hooks/mutation";
import { useAddVoterContext } from "context/AddVoterContext";
import { useElectionContext } from "../../../../../context/ElectionContext";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { queryClient } from "../../../../../services/accountAPI";
import { useVoterGetIdQuery } from "hooks/query";

type EditSocmediaProps = {
  setOpenGrid: boolean | any;
};
const voterStatus = [
  {
    title: "100%",
    params: "vip",
    color: "#000000",
  },
  {
    title: "75%",
    params: "gold",
    color: "#FBC22E",
  },
  {
    title: "50%",
    params: "bronze",
    color: "#AF713F",
  },
  {
    title: "25%",
    params: "silver",
    color: "#7E7E7E",
  },
];

const EditSocmedia: React.FC<EditSocmediaProps> = ({ setOpenGrid }) => {
  const useEditVoter = useEditVoterMutation();
  const { electionId } = useElectionContext();
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const [isHovering, setIsHovering] = useState(-1);
  const voterGetById = useVoterGetIdQuery({ id: Number(query.voterId) });

  const {
    image,
    first_name,
    last_name,
    organization,
    phone_number,
    instagram,
    telegram,
    whatsapp,
    facebook,
    email,
    continent,
    country,
    status,
  } = useAddVoterContext();
  const [statusState, setStatusState] = useState(voterGetById.data.status);
  const form = useForm({
    initialValues: {
      firstname: first_name,
      lastname: last_name,
      phone: phone_number,
      organization: organization,
      telegram: telegram,
      instagram: instagram,
      whatsapp: whatsapp,
      facebook: facebook,
      email: email,
      image,
    },
    // functions will be used to validate values at corresponding key
    validate: {
    //   email: (value) =>
    //     value.length < 2 ? "Email address must have at least  letters" : null,
    },
  });

  const sendEditVoter = (e: any) => {
    const formData = new FormData();
    phone_number && formData.append("phone_number", phone_number);
    e.telegram && formData.append("telegram", e.telegram);
    e.facebook && formData.append("facebook", e.facebook);
    e.whatsapp && formData.append("whatsapp", e.whatsapp);
    e.email && formData.append("email", e.email);
    first_name && formData.append("first_name", first_name);
    last_name && formData.append("last_name", last_name);
    organization && formData.append("organization", organization);
    statusState && formData.append("status", statusState);
    electionId && formData.append("election", electionId);
    formData.append("invite_people", "0");
    image && formData.append("image", image);
    formData.append("continent", continent)
    formData.append("country", country)

    const editVoter = useEditVoter.mutateAsync({
      data: formData,
      id: Number(query?.voterId),
    });
    editVoter
      .then((res) => {
        setOpenGrid("");
        queryClient.refetchQueries("/voters/");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div className="votereditsoc__wrapper">
      <div className="votereditsoc__top">
        <h2>
          {first_name} {last_name}
        </h2>
        <img onClick={setOpenGrid} src={closeIcon} alt="Close" />
      </div>
      <div className="votereditsoc__form">
        <p>Social media</p>
        <form onSubmit={form.onSubmit(sendEditVoter)}>
          <Grid gutter="sm">
            <Grid.Col span={6}>
              <TextInput
                placeholder="Telegram"
                {...form.getInputProps("telegram")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Whatsapp"
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
          <div className="votersoc__choose-status">
            <h3>Choose status</h3>
            <div>
              {voterStatus.map((status, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setStatusState(status.params)}
                  className={`${
                    status.params == statusState ? "active" : null
                  }`}
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(-1)}
                  style={
                    status.params === statusState || isHovering === index
                      ? {
                          backgroundColor: status.color,
                          color: "#fff",
                        }
                      : {}
                  }
                >
                  {status.title}
                </button>
              ))}
            </div>
          </div>
          <div className="votereditsoc__btn-Save">
            <Button type="submit" loading={useEditVoter.isLoading}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSocmedia;
