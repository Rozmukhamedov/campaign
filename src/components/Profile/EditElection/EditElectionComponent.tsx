import "./styless.css";
import toast from "react-hot-toast";
import { FC, useEffect } from "react";
import { Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import Button from "components/Button/Button";
import { queryClient } from "services/accountAPI";
import {
  useDeleteElectionMutation,
  useEditElectionMutation,
} from "hooks/mutation";
import { useGetElectionById } from "hooks/query/useGetElectionById";
import { useNavigate } from "react-router-dom";

type EditElectionComponentProps = {
  setView: any;
  id: any;
};

const EditElectionComponent: FC<EditElectionComponentProps> = ({
  id,
  setView,
}) => {
  const getElectionByID = useGetElectionById(id, !!id);
  const useEditElection = useEditElectionMutation();
  const useDeleteElection = useDeleteElectionMutation();
  const navigate = useNavigate();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      id: "",
      goal: "",
      organize: "",
      predictions: "",
      starting_day: "",
      voting_day: "",
    },
  });

  useEffect(() => {
    form.setValues({
      id: getElectionByID.data?.id,
      goal: getElectionByID.data?.goal,
      organize: getElectionByID.data?.organize
        ? getElectionByID.data?.organize
        : "",
      predictions: getElectionByID.data?.predictions
        ? getElectionByID.data?.predictions
        : "",
      starting_day: getElectionByID.data?.starting_day,
      voting_day: "",
    });
  }, [getElectionByID.isSuccess, getElectionByID.data]);

  const onSubmitChange = (e: any) => {
    const data = {
      title: e.goal,
      goal: e.goal,
      organize: e.organize,
      predictions: Number(e.predictions),
    };

    const editElection = useEditElection.mutateAsync({ data: data, id: e.id });
    editElection
      .then((res) => {
        form.reset();
        toast.success("Created");
        setView("account");
        queryClient.refetchQueries("get-elections-list");
        if (
          localStorage.getItem("election_title") == getElectionByID.data?.goal
        ) {
          localStorage.setItem("election_title", e.goal);
        }
      })

      .catch((err) => {
        toast.error("Server Error");
      });
  };

  const deleteElectionChange = () => {
    const deleteElection = useDeleteElection.mutateAsync(id);
    deleteElection.then((res) => {
      form.reset();
      toast.remove("Deleted Election");

      if (Number(localStorage.getItem("election_id")) == id) {
        localStorage.removeItem("election_id");
        localStorage.removeItem("election_title");
        navigate("/election", { replace: true });
        return;
      }
      queryClient.refetchQueries("get-elections-list");
      setView("account");
    });
  };

  return (
    <div className="Edit__wrapper">
      <div className="edit__info">
        <h2>{getElectionByID.data?.goal}</h2>
        <hr className="hr" />
      </div>
      <form onSubmit={form.onSubmit(onSubmitChange)}>
        <div className="yougoal">
          <p>You goal</p>
          <Input
            invalid={form.getInputProps("goal").error}
            type="text"
            variant="filled"
            placeholder="Type your Goal"
            radius="md"
            size="md"
            value={form.values?.goal}
            {...form.getInputProps("goal")}
          />
        </div>
        <div className="organize">
          <p>Organization</p>
          <Input
            invalid={form.getInputProps("organize").error}
            type="text"
            variant="filled"
            placeholder="Type your organize"
            radius="md"
            size="md"
            value={form.values?.organize}
            {...form.getInputProps("organize")}
          />
        </div>
        <div className="predictions">
          <p>Predictions</p>
          <Input
            invalid={form.getInputProps("predictions").error}
            type="number"
            variant="filled"
            placeholder="Type your Predictions"
            radius="md"
            size="md"
            value={form.values?.predictions}
            {...form.getInputProps("predictions")}
          />
        </div>
        <div className="starting__day">
          <p>Starting Day</p>
          <DatePicker
            className="date__picker"
            placeholder="Pick date"
            inputFormat="MM-DD-YYYY"
            labelFormat="MM-YYYY"
            clearable={false}
            {...form.getInputProps("starting_day")}
            error={form.getInputProps("starting_day").error}
            defaultValue={new Date(getElectionByID.data?.starting_day)}
          />
        </div>
        <div className="starting__day">
          <p>Voting Day</p>
          <DatePicker
            value={new Date(getElectionByID.data?.voting_day)}
            className="date__picker"
            placeholder="Pick date"
            inputFormat="MM/DD/YYYY"
            labelFormat="MM/YYYY"
            clearable={false}
            error
            {...form.getInputProps("voting_day")}
          />
        </div>
        <div className="sidebar__btn-save">
          <Button type={"submit"}>Save</Button>
          <Button
            onClick={deleteElectionChange}
            className="btn__delete"
            type={"button"}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditElectionComponent;
