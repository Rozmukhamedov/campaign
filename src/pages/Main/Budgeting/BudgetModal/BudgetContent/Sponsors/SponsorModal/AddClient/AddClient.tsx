import "./style.css";
import { useState } from "react";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import { getBase64File } from "utils/general";
import { useCreateSponsorMutation } from "hooks/mutation";
import { useElectionContext } from "context/ElectionContext";
import { FileButton, Grid, Modal, TextInput } from "@mantine/core";
import closeIcon from "../../../../../../../../assets/images/closeicon.svg";
import toast from "react-hot-toast";

type AddClientProps = {
  opened: boolean;
  useGetSponsors: any;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddClient: React.FC<AddClientProps> = ({
  opened,
  setOpened,
  useGetSponsors,
}) => {
  const useCreateSponsor = useCreateSponsorMutation();
  const [file, setFile] = useState<string>("");
  const [formImg, setFormImg] = useState<any>();
  const { electionId } = useElectionContext();

  const onFileChange = (file: any) => {
    setFormImg(file);
    getBase64File(file).then((res) => {
      setFile(res);
    });
  };

  const form = useForm({
    initialValues: {
      telegram: "",
      whatsapp: "",
      facebook: "",
      email: "",
      organization: "",
      // name: "",
    },

    validate: {
      // name: (value) =>
      //   value.length < 2 ? "Email address must have at least  letters" : null,
      organization: (value) =>
        value.length < 2 ? "Email address must have at least  letters" : null,
      // email: (value) =>
      //   value.length < 2 ? "Email address must have at least  letters" : null,
    },
  });

  const createNewSponsor = (e: any) => {
    const formData = new FormData();
    formData.append("name", e.organization);
    formData.append("election", electionId);
    formData.append("email", e.email);
    formData.append("whatsapp", e.whatsapp);
    formData.append("facebook", e.facebook);
    formData.append("telegram", e.telegram);
    formImg && formData.append("image", formImg);

    const createsponsor = useCreateSponsor.mutateAsync(formData);
    createsponsor
      .then((res) => {
        setOpened(false);
        form.reset();
        setFormImg(null);
        setFile("");
        useGetSponsors.refetch();
        toast.success("Created");
      })
      .catch((err) => {
        toast.error("Error Server");
      });
  };

  const closePopupClient = () => {
    form.reset();
    setOpened(false);
    setFormImg(null);
    setFile("");
  };

  return (
    <Modal opened={opened} onClose={closePopupClient}>
      <div className="add__client-wrapper">
        <div className="add__client-top">
          <h2>Add New Sponsor</h2>
          <img onClick={closePopupClient} src={closeIcon} alt="closeIcon" />
        </div>
        <div className="add__client-photo">
          <p>Photo</p>
          <div className="add__client-download-img">
            <FileButton onChange={onFileChange} accept="">
              {(props) => <Button {...props}>Choose photo</Button>}
            </FileButton>
            {/* /* props src={file}* / */}
            {file && <img src={file} alt="voter-photo" />}
          </div>
        </div>
        <form
          onSubmit={form.onSubmit(createNewSponsor)}
          className="add__clientsoc-form"
        >
          <div>
            {/* <div className="organization">
              <p>Name Surname</p>
              <TextInput placeholder="Name" {...form.getInputProps("name")} />
            </div> */}
            <div className="organization">
              <p>Organization</p>
              <TextInput
                placeholder="Organization"
                {...form.getInputProps("organization")}
              />
            </div>
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
                  placeholder="Your Email"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
            </Grid>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddClient;
