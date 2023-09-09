import "./style.css";
import React from "react";
import { Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCreateElectionMutation } from "hooks/mutation";
import { formatDate } from "utils/helpers/format-date";
import toast from "react-hot-toast";
import { queryClient } from "services/accountAPI";
import Button from "components/Button";
import { DatePicker } from "@mantine/dates";

function CreateElectionPage() {
  const useCreateElection = useCreateElectionMutation();
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      goal: "",
      organize: "",
      // predictions: "",
      starting_day: null,
      voting_day: null,
    },

    validate: {
      goal: (value) => (value.length < 1 ? "true" : null),
      organize: (value) => (value.length < 1 ? "true" : null),
      starting_day: (value) => (value ? null : true),
      voting_day: (value) => (value ? null : true),
    },
  });

  const createElectionSumbit = (e: any) => {
    const [yearStart, monthStart, dayStart] = formatDate(e.starting_day);
    const [year, month, day] = formatDate(e.voting_day);

    const data = {
      title: e.goal,
      goal: e.goal,
      organize: e.organize,
      predictions: 0,
      starting_day: `${yearStart}-${monthStart}-${dayStart}`,
      voting_day: `${year}-${month}-${day}`,
    };

    const createElection = useCreateElection.mutateAsync(data);
    createElection
      .then((res) => {
        form.reset();
        toast.success("Created");
        queryClient.refetchQueries("get-elections-list");
        navigate("/election");
      })
      .catch((err) => {
        toast.error("Server Error");
      });
  };

  return (
    <form
      onSubmit={form.onSubmit(createElectionSumbit)}
      className="election__create"
    >
      <div className="election__create-container">
        <h2>
          Create Your <br />
          Election
        </h2>
        <div className="yougoal">
          <p>You goal</p>
          <Input
            invalid={form.getInputProps("goal").error}
            type="text"
            variant="filled"
            placeholder="Type your Goal"
            radius="md"
            size="md"
            {...form.getInputProps("goal")}
          />
        </div>
        <div className="organize">
          <p>Organization</p>
          <Input
            invalid={form.getInputProps("organize").error}
            type="text"
            variant="filled"
            placeholder="Type your Organization"
            radius="md"
            size="md"
            {...form.getInputProps("organize")}
          />
        </div>
        {/* <div className="predictions">
          <p>Predictions</p>
          <Input
            invalid={form.getInputProps("predictions").error}
            type="number"
            variant="filled"
            placeholder="Type your Predictions"
            radius="md"
            size="md"
            {...form.getInputProps("predictions")}
          />
        </div> */}
        <div className="starting__day">
          <p>Starting Day</p>
          <DatePicker
            className="date__picker"
            placeholder="Pick date"
            inputFormat="MM/DD/YYYY"
            labelFormat="MM/YYYY"
            clearable={false}
            withAsterisk
            {...form.getInputProps("starting_day")}
            error={form.getInputProps("starting_day").error}
          />
        </div>
        <div className="starting__day">
          <p>Voting Day</p>
          <DatePicker
            className="date__picker"
            placeholder="Pick date"
            inputFormat="MM/DD/YYYY"
            labelFormat="MM/YYYY"
            clearable={false}
            error
            {...form.getInputProps("voting_day")}
          />
        </div>
        <Button className="btn" type={"submit"}>
          Create
        </Button>
      </div>
    </form>
  );
}

export default CreateElectionPage;
