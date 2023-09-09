import "./style.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "@mantine/form";
import { Modal, Textarea, Select } from "@mantine/core";
import { Button, TextInput } from "@mantine/core";
import { useCreateTransactionMutation } from "hooks/mutation";
import closeIcon from "assets/images/closeicon.svg";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useElectionContext } from "context/ElectionContext";
import { useGetSponsorsQuery, useTransactionsDetail } from "hooks/query";
import { useEditTransactionsById } from "hooks/mutation/useEditTransactionsById";

type ModalAddIncProps = {
  change: any;
  useGetTransactions: any;
  setChange: React.Dispatch<
    React.SetStateAction<{ open_type: string; id?: number }>
  >;
  balance: any;
};

const ModalAddInc: React.FC<ModalAddIncProps> = ({
  change,
  setChange,
  useGetTransactions,
  balance,
}) => {
  const useCreateTransaction = useCreateTransactionMutation();
  const { electionId } = useElectionContext();
  const transactionsDetail = useTransactionsDetail({
    id: change?.id,
    enabled: !!change?.id,
  });

  const [sponsor, setSponsor] = useState<string | null>(
    transactionsDetail?.data?.sponsor
  );

  const useGetSponsors = useGetSponsorsQuery({
    election: electionId,
    enabled: true,
  });
  const editTransactionsById = useEditTransactionsById();

  const options = useGetSponsors?.data?.results?.map(
    (item: any, index: number) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    }
  );
  const form = useForm({
    validateInputOnChange: false,
    initialValues: {
      reason: "",
      data: new Date(),
      amount: "",
      description: "",
      time: new Date(),
      sponsor: null,
    },

    validate: {
      reason: (value) =>
        value.length < 2 ? "Reason must have at least 2 letters" : null,
      data: (value) => (!value ? "Date is required" : null),
      time: (value) => (value == null ? "Date" : null),
      amount: (value) =>
        value.length < 1 ? "How much must have at least 10 letters" : null,
    },
  });

  useEffect(() => {
    if (transactionsDetail?.data !== undefined) {
      form.setValues({
        reason: transactionsDetail?.data?.reason || "",
        data: new Date(transactionsDetail?.data?.custom_date),
        amount: transactionsDetail?.data?.amount,
        description: transactionsDetail?.data?.description,
        time: new Date(transactionsDetail?.data?.data),
        sponsor: transactionsDetail?.data?.sponsor,
      });
      setSponsor(transactionsDetail?.data?.sponsor);
    }
  }, [transactionsDetail?.isSuccess, change]);

  const createGeneral = (values: any) => {
    if (!!change?.id) {
      const editTransactions = editTransactionsById.mutateAsync({
        data: {
          ...values,
          data: `${dayjs(values.data).format(
            "YYYY-MM-DD"
          )} ${values?.time?.getHours()}:${values?.time?.getMinutes()}`,
        },
        id: change?.id,
      });
      return editTransactions
        ?.then((res) => {
          form.reset();
        })
        .catch((err) => {
          toast.error("Server Error");
        });
    }
    const data = {
      transaction_type: "income",
      reason: values.reason,
      amount: Number(values.amount),
      data: `${dayjs(values.data).format(
        "YYYY-MM-DD"
      )} ${values?.time?.getHours()}:${values?.time?.getMinutes()}`,
      election: electionId,
      sponsor: sponsor,
      description: values.description,
    };
    const createTransaction = useCreateTransaction.mutateAsync(data);
    createTransaction
      .then((res) => {
        setChange({ open_type: "" });
        useGetTransactions.refetch();
        form.reset();
        balance.refetch();
        toast.success("Created");
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  const closeIncomeCreate = () => {
    setChange({ open_type: "" });
    form.reset();
    form.setValues({});
  };

  return (
    <Modal
      className="modal__income"
      opened={!!change.open_type}
      onClose={closeIncomeCreate}
    >
      <div className="modal__income-inner">
        <div className="modal__income-top">
          <h2>{!!change?.id ? transactionsDetail?.data?.reason : "Income"}</h2>
          <img onClick={closeIncomeCreate} src={closeIcon} alt="Close" />
        </div>
        <form onSubmit={form.onSubmit(createGeneral)}>
          <TextInput
            label="Reason"
            placeholder="Reason"
            {...form.getInputProps("reason")}
          />
          <Select
            label="Source"
            placeholder="Source"
            data={options || []}
            value={sponsor}
            onChange={setSponsor}
          />
          <DatePicker
            placeholder="Pick date"
            label="Event date"
            inputFormat="MM/DD/YYYY"
            labelFormat="MM/YYYY"
            clearable={false}
            {...form.getInputProps("data")}
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
            {...form.getInputProps("description")}
          />
          <Button className="btn" type="submit">Add</Button>
        </form>
      </div>
    </Modal>
  );
};
export default ModalAddInc;
