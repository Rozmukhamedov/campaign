import { Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import "./style.css";
import closeIcon from "../../../../../../../../assets/images/closeicon.svg";

type AddAmountModalProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddAmountModal: React.FC<AddAmountModalProps> = ({
  opened,
  setOpened,
}) => {
  const form = useForm({
    initialValues: { datetext: " ", howmuch: " " },

    validate: {
      datetext: (value) =>
        value.length < 2 ? "Date must have at least 2 letters" : null,

      howmuch: (value) =>
        value.length < 2 ? "Date must have at least 2 letters" : null,
    },
  });
  return (
    <Modal
      className="addamount_modal-root"
      opened={opened}
      onClose={() => setOpened(false)}
    >
      <div className="addamount_wrapper">
        <div className="addamount__wrapper">
          <div className="addamount__top">
            <h2>The olives</h2>
            <img
              onClick={() => setOpened(false)}
              src={closeIcon}
              alt="closeicon"
            />
          </div>
          <div>
            <form
              className="addamount__form"
              onSubmit={form.onSubmit(console.log)}
            >
              <TextInput
                label="Date"
                placeholder="Date"
                {...form.getInputProps("datetext")}
              />
              <TextInput
                mt="sm"
                label="How much"
                placeholder="How much"
                {...form.getInputProps("howmuch")}
              />
              <div className="addamount__btn">
                <button>Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAmountModal;
