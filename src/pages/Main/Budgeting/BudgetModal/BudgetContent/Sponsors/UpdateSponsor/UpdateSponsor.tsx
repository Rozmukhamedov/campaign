import { Button, FileButton, Grid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useElectionContext } from "context/ElectionContext";
import { useEditSponsorMutation } from "hooks/mutation";
import { useGetSponsorQuery } from "hooks/query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getBase64File } from "utils/general";
import closeIcon from "../../../../../../../assets/images/closeicon.svg";
import "./style.css";

type UpdateSponsor = {
  setOpenUpdate: React.Dispatch<React.SetStateAction<string>>;
  sponsorId: any;
  openUpdate: any;
  useGetSponsors: any;
  setSponsorId: any;
};

const UpdateSponsor: React.FC<UpdateSponsor> = ({
  setOpenUpdate,
  sponsorId,
  openUpdate,
  useGetSponsors,
  setSponsorId
}) => {
  const [file, setFile] = useState<string>();
  const [formImg, setFormImg] = useState<any>();
  const { electionId } = useElectionContext();
  const useEditSponsor = useEditSponsorMutation();

  const getSponsor = useGetSponsorQuery({
    id: sponsorId,
    election: electionId,
    enabled: openUpdate == "update",
  });

  const form = useForm({
    initialValues: {
      telegram: "",
      whatsapp: "",
      facebook: "",
      email: "",
    },

    // validate: {
    //   email: (value) =>
    //     value.length < 2 ? "Email address must have at least  letters" : null,
    // },
  });

  const onFileChange = (file: any) => {
    setFormImg(file);
    getBase64File(file).then((res) => {
      setFile(res);
    });
  };

  const editSponsor = (e: any) => {
  
    const formData = new FormData();
    formData.append("email", e.email);
    formData.append("whatsapp", e.whatsapp);
    formData.append("facebook", e.facebook);
    formData.append("telegram", e.telegram);
    formImg && formData.append("image", formImg);

    const editsponsor = useEditSponsor.mutateAsync({
      data: formData,
      id: sponsorId,
    });
    editsponsor
      .then((res) => {
        setOpenUpdate("sponsoritem");
        form.reset();
        setFormImg(null);
        setFile("");
        toast.success("Edit");
        useGetSponsors.refetch();
        setSponsorId(null)
      })
      .catch((err) => {
        form.reset();
        toast.error("Error Server");
      });
  };

  useEffect(() => {
    form.setValues({
      telegram: getSponsor.data?.social_media?.telegram,
      whatsapp: getSponsor.data?.social_media?.whatsapp,
      facebook: getSponsor.data?.social_media?.facebook,
      email: getSponsor.data?.social_media?.email,
    });
  }, [getSponsor.isSuccess]);

  return (
    <div className="updatespon__wrapper">
      <div className="updatespon__top">
        <div>
          <h2>{getSponsor.data?.name}</h2>
          <div className="updatespon__photo">
            <p>Photo</p>
            <div className="updatespon__download-img">
              <FileButton onChange={onFileChange} accept="">
                {(props) => <Button {...props}>Choose photo</Button>}
              </FileButton>
              {/* /* props src={file}* / */}
              {file && <img src={file} alt="voter-photo" />}
              {!file && getSponsor.data?.image && (
                <img src={getSponsor.data?.image} alt="voter-photo" />
              )}
            </div>
          </div>
        </div>
        <div className="updatespon__closeicon">
          <img
            onClick={() => {setOpenUpdate("sponsoritem");  form.reset();}}
            src={closeIcon}
            alt="closeIcon"
          />
        </div>
      </div>
      <div className="updatesponsoc__form">
        <form
          onSubmit={form.onSubmit(editSponsor)}
          className="updatesponsoc__form-control"
        >
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

          <div className="updatespon__btn-Save">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSponsor;
