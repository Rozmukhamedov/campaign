import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import { getBase64File } from "utils/general";
import { useElectionContext } from "context/ElectionContext";
import { useAddContactPersonMutation } from "hooks/mutation";
import { FileButton, Grid, Modal, TextInput } from "@mantine/core";
import closeIcon from "../../../../../../../../assets/images/closeicon.svg";

type AddContactProps = {
  opened: boolean;
  setOpened: any | React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
  contactsList: any;
};

const AddContact: React.FC<AddContactProps> = ({
  opened,
  setOpened,
  item,
  contactsList,
}) => {
  const [file, setFile] = useState<string>("");
  const [formImg, setFormImg] = useState<any>();
  const { electionId } = useElectionContext();
  const useAddContactPerson = useAddContactPersonMutation();

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
      name: "",
      phonenumber: "",
      position: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have" : null,
      // email: (value) => (value.length < 2 ? "Email address must have" : null),
      // phonenumber: (value) =>
      //   value.length < 2 ? "Phone number must have" : null,
      position: (value) => (value.length < 1 ? "Position must have" : null),
    },
  });

  const createPersonContact = (e: any) => {
    const formData = new FormData();
    formData.append("sponsor", item.id);
    formData.append("first_name", e.name);
    formData.append("election", electionId);
    formData.append("email", e.email);
    formData.append("image", formImg);
    formData.append("whatsapp", e.whatsapp);
    formData.append("facebook", e.facebook);
    formData.append("telegram", e.telegram);
    formData.append("position", e.position);
    formData.append("phone_number", e.phonenumber);


    const addContactPerson = useAddContactPerson.mutateAsync(formData);
    addContactPerson
      .then((res) => {
        setOpened(false);
        form.reset();
        setFormImg(null);
        setFile("");
        contactsList.refetch();
        toast.success("Created");
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  const closePopupClient = () => {
    form.reset();
    setOpened(false);
    setFormImg(null);
    setFile("");
  };

  return (
    <div>
      <>
        <Modal opened={opened} onClose={closePopupClient}>
          <div className="add__client-wrapper">
            <div className="add__client-top">
              <h2>Add Contact Person</h2>
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
              onSubmit={form.onSubmit(createPersonContact)}
              className="add__clientsoc-form"
            >
              <div>
                <div className="organization">
                  <TextInput
                    label="Name Surname"
                    type="text"
                    placeholder="Name"
                    {...form.getInputProps("name")}
                  />
                </div>
                <div className="phonenumber">
                  <TextInput
                    type="number"
                    placeholder="Your phone"
                    label="Phone"
                    {...form.getInputProps("phonenumber")}
                  />
                </div>
                <div className="position">
                  <TextInput
                    type="text"
                    placeholder="Your position"
                    label="Position"
                    {...form.getInputProps("position")}
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
              <Button type="submit" style={{ marginTop: 60 }}>
                Save
              </Button>
            </form>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default AddContact;
