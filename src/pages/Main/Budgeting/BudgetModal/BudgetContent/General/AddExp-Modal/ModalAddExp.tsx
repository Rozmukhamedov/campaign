import "./style.css";
import React from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useForm } from "@mantine/form";
import { Modal, Textarea } from "@mantine/core";
import { Button, TextInput } from "@mantine/core";
import { useCreateTransactionMutation } from "hooks/mutation";
import closeIcon from "../../../../../../../assets/images/closeicon.svg";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useElectionContext } from "context/ElectionContext";

type ModalAddExpProps = {
  opened: boolean;
  useGetTransactions: any;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  balance: any;
};

const ModalAddExp: React.FC<ModalAddExpProps> = ({
  opened,
  setOpened,
  useGetTransactions,
  balance,
}) => {
  const useCreateTransaction = useCreateTransactionMutation();
  const { electionId } = useElectionContext();

  const form = useForm({
    validateInputOnChange: false,
    initialValues: {
      reason: "",
      date: "",
      amount: "",
      note: "",
      time: null,
      sponsor: null,
    },

    validate: {
      reason: (value) =>
        value.length < 2 ? "Reason must have at least 2 letters" : null,

      date: (value) => (value.length < 1 ? "Date" : null),

      time: (value) => (value == null ? "Date" : null),

      amount: (value) =>
        value.length < 1 ? "How much must have at least 10 letters" : null,
    },
  });

  const createGeneral = (values: any) => {
    const data = {
      transaction_type: "expense",
      reason: values.reason,
      amount: Number(values.amount),
      data: `${dayjs(values.date).format(
        "YYYY-MM-DD"
      )} ${values?.time?.getHours()}:${values?.time?.getMinutes()}`,
      election: electionId,
      sponsor: values.sponsor,
      description: values.note,
    };

    const createTransaction = useCreateTransaction.mutateAsync(data);
    createTransaction
      .then((res) => {
        setOpened(false);
        useGetTransactions.refetch();
        form.reset();
        balance.refetch();
        toast.success("Created");
      })

      .catch((err) => {
        if(err?.response?.status === 400){
          toast.error("Expense can’t exceed income"); 
          return
        }
        toast.error("Server Error");
      });
  };

  const closeIncomeCreate = () => {
    setOpened(false);
    form.reset();
  };

  return (
    <div className="modaladdexp__wrapper">
      <Modal
        opened={opened}
        onClose={closeIncomeCreate}
        title="Introduce yourself!"
      >
        <div className="modaladdexp__inner">
          <div className="modaladdexp__top">
            <h2>Expense</h2>
            <img onClick={closeIncomeCreate} src={closeIcon} alt="Close" />
          </div>
          <div className="modaladdexp__info">
            <div className="modaladdexp__form">
              <form
                onSubmit={form.onSubmit(createGeneral)}
                className="modaladdexp__form-control"
              >
                <TextInput
                  label="Reason"
                  placeholder="Reason"
                  {...form.getInputProps("reason")}
                />
                <DatePicker
                  placeholder="Pick date"
                  label="Event date"
                  inputFormat="MM/DD/YYYY"
                  labelFormat="MM/YYYY"
                  clearable={false}
                  {...form.getInputProps("date")}
                />
                <TimeInput
                  label="Pick time"
                  variant="filled"
                  amLabel="am"
                  pmLabel="pm"
                  {...form.getInputProps("time")}
                />
                <TextInput
                  type="number"
                  label="How much"
                  placeholder="How much"
                  {...form.getInputProps("amount")}
                />
                <Textarea
                  placeholder="Your Note"
                  label="Note"
                  {...form.getInputProps("note")}
                />
                <div className="modaladdexp__btn-add">
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ModalAddExp;
