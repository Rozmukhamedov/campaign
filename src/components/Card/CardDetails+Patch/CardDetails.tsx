import "./style.css";
import { FC, useState } from "react";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import closeIcon from "../../../assets/images/closeicon.svg";
import { FileButton, Grid, NumberInput, TextInput } from "@mantine/core";
import { usePutchCandidateMutation } from "hooks/mutation/usePutchCandidateMutation";
import { getBase64File } from "utils/general";
import { queryClient } from "services/accountAPI";

type CardDetailsProps = {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showDetails: boolean;
  CandidatesListDetail: any;
  voterfirstname: string;
  voterlastname: string;
};

const CardDetails: FC<CardDetailsProps> = ({
  setShowDetails,
  CandidatesListDetail,
  voterfirstname,
  voterlastname,
}) => {
  const [formImg, setFormImg] = useState<any>();
  const [file, setFile] = useState<string>("");
  const usePatchCandidates = usePutchCandidateMutation({
    id: CandidatesListDetail.data?.id,
  });
  const form = useForm({
    initialValues: {
      telegram: CandidatesListDetail.data.social_contacts?.telegram || "",
      whatsapp: CandidatesListDetail.data?.social_contacts?.whatsapp || "",
      facebook: CandidatesListDetail.data?.social_contacts?.facebook || "",
      email: CandidatesListDetail.data?.social_contacts?.email || "",
      firstname: CandidatesListDetail.data?.first_name || "",
      lastname: CandidatesListDetail.data?.last_name || "",
      predictions: CandidatesListDetail.data?.predictions,
      phone: CandidatesListDetail.data.social_contacts?.phone_number,
      formImg: CandidatesListDetail.data?.image || "",
    },

    validate: {
      firstname: (value) =>
        value.length < 2 ? "First name address must " : null,
      lastname: (value) =>
        value.length < 2 ? "Last name address must " : null,
      // email: (value) => (value.length < 2 ? "Email address " : null),
      // predictions: (value) => (value.length < 0 ? "predictions " : null),
    },
  });

  const UpdateUser = (e: any) => {
    const formData = new FormData();
    e.phone && formData.append("phone_number", e.phone);
    e.telegram && formData.append("telegram", e.telegram);
    e.facebook && formData.append("facebook", e.facebook);
    e.whatsapp && formData.append("whatsapp", e.whatsapp);
    e.email && formData.append("email", e.email);
    e.firstname && formData.append("first_name", e.firstname);
    e.lastname && formData.append("last_name", e.lastname);
    e.organization && formData.append("organization", e.organization);
    e.predictions && formData.append("predictions", e.predictions);
    formImg && formData.append("image", formImg);

    const PutchCandidates = usePatchCandidates.mutateAsync(formData);
    PutchCandidates.then((res) => {
      queryClient.refetchQueries("use-get-all-candidates");
      CandidatesListDetail.refetch();
      setShowDetails(false);
    }).catch((err) => {
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
    <div className="carddetails">
      <div>
        <div className="cardpatch__top">
          <h2>
            {voterfirstname} {voterlastname}
          </h2>
          <img
            onClick={() => setShowDetails(false)}
            src={closeIcon}
            alt="closeIcon"
          />
        </div>
        <div className="cardpatch__photo">
          <p>Photo</p>
          <div className="cardpatch__download-img">
            <FileButton onChange={onFileChange} accept="image">
              {(props) => <Button {...props}>Choose photo</Button>}
            </FileButton>
            {file ? (
              <img style={{ marginLeft: 10 }} src={file} alt="candidat-photo" />
            ) : null}
            {CandidatesListDetail.data?.image ? (
              <img
                style={{ marginLeft: 10, borderRadius: "4px" }}
                src={CandidatesListDetail.data?.image}
                alt="candidat-photo"
              />
            ) : null}
          </div>
        </div>
        <div className="cardpatch__form">
          <form
            onSubmit={form.onSubmit(UpdateUser)}
            className="addcardsoc__form-control"
          >
            <div className="organization">
              <TextInput
                label="First name"
                placeholder="Organization"
                value={form?.values?.firstname}
                {...form.getInputProps("firstname")}
              />
              <TextInput
                label="Last name"
                placeholder="Last name"
                value={form?.values?.lastname}
                {...form.getInputProps("lastname")}
              />
              <TextInput
                label="Phone number"
                placeholder="+998900028833"
                value={form?.values?.phone}
                {...form.getInputProps("phone")}
              />
            </div>
            <p>Social media</p>
            <Grid gutter="xs">
              <Grid.Col span={6}>
                <TextInput
                  label=""
                  placeholder="Telegram"
                  value={form?.values?.telegram}
                  {...form.getInputProps("telegram")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="WhatsApp"
                  value={form?.values?.whatsapp}
                  {...form.getInputProps("whatsapp")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="Facebook"
                  value={form?.values?.facebook}
                  {...form.getInputProps("facebook")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  type="email"
                  placeholder="Your email"
                  value={form?.values?.email}
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
            </Grid>
            <NumberInput
              label="Predictions"
              placeholder="Predictions"
              value={form?.values?.predictions}
              {...form.getInputProps("predictions")}
            />
            <div className="cardpatch__btn-add">
              <Button
                loading={usePatchCandidates.isLoading}
                width="100%"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
