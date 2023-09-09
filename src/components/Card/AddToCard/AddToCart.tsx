import "./style.css";
import { FC, useState } from "react";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import closeIcon from "../../../assets/images/closeicon.svg";
import { FileButton, Grid, NumberInput, TextInput } from "@mantine/core";
import { useCreateCandidatesMutation } from "hooks/mutation/useCreateCandidatesMutation";
import { useStatesPopup } from "context/MainStatesContext";
import { getBase64File } from "utils/general";
import { queryClient } from "services/accountAPI";
import { useElectionContext } from "../../../context/ElectionContext";

type AddToCardProps = {
  setShowAddCand: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddToCart: FC<AddToCardProps> = ({ setShowAddCand }) => {
  const [formImg, setFormImg] = useState<any>();
  const { electionId } = useElectionContext();
  const [file, setFile] = useState<string>("");
  const useCreateCandidates = useCreateCandidatesMutation();

  const form = useForm({
    initialValues: {
      telegram: "",
      whatsapp: "",
      facebook: "",
      email: "",
      firstname: "",
      lastname: "",
      predictions: "",
      phone: "",
      image: "",
    },

    validate: {
      firstname: (value) =>
        value.length < 2 ? "First name adress must " : null,
      lastname: (value) => (value.length < 2 ? "Last name adress must " : null),
      // email: (value) => (value.length < 2 ? "Email adress " : null),
      // predictions: (value) => (value.length < 2 ? "Organization must " : null),
    },
  });

  const createCandidant = (e: any) => {
    const formData = new FormData();
    formData.append("phone_number", e.phone);
    formData.append("telegram", e.telegram);
    formData.append("telegram", e.telegram);
    formData.append("facebook", e.facebook);
    formData.append("whatsapp", e.whatsapp);
    formData.append("email", e.email);
    formData.append("first_name", e.firstname);
    formData.append("last_name", e.lastname);
    formData.append("organization", e.organization);
    formData.append("predictions", e.predictions);
    formData.append("election", electionId);
    formImg && formData.append("image", formImg);

    const createCandidates = useCreateCandidates.mutateAsync(formData, {
      // onSuccess: () => {
      //   queryClient.invalidateQueries();
      // },
    });
    createCandidates
      .then((res) => {
        form.reset();
        queryClient.refetchQueries("use-get-all-candidates");
        setShowAddCand(false);
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
    <div className="addcard__wrapper">
      <div>
        <div className="addcard__top">
          <h2>New candidate</h2>
          <img
            onClick={() => setShowAddCand(false)}
            src={closeIcon}
            alt="closeIcon"
          />
        </div>
        <div className="addcard__photo">
          <p>Photo</p>
          <div className="addcard__download-img">
            <FileButton onChange={onFileChange} accept="">
              {(props) => <Button {...props}>Choose photo</Button>}
            </FileButton>
            {file && <img src={file} alt="candidat-photo" />}
          </div>
        </div>
        <div className="addcardsoc__form">
          <form
            onSubmit={form.onSubmit(createCandidant)}
            className="addcardsoc__form-control"
          >
            <div className="organization">
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
            </div>
            <p>Social media</p>
            <Grid gutter="xs">
              <Grid.Col span={6}>
                <TextInput
                  label=""
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
            <NumberInput
              className="addcard__org-input"
              label="Predictions"
              placeholder="Predictions"
              {...form.getInputProps("predictions")}
            />
            <div className="addcard__btn-add">
              <Button type="submit">Add</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
