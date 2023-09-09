import "./style.css";
import toast from "react-hot-toast";
import { Input } from "@mantine/core";
import Button from "components/Button/Button";
import closeIcon from "assets/images/closeicon.svg";
import React, { ChangeEvent, useState } from "react";
import ChooseItem, { ChooseItemProps } from "./ChooseItem";
import { useElectionContext } from "context/ElectionContext";
import { useCreateTeamWithChoosingMutation } from "hooks/mutation";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import { useGetTeamQuery, useGetTeamWithChoosingQuery } from "hooks/query";


type AddChooseProps = {
  setTeamPage: any;
  isHovering: boolean;
};
const AddChoose: React.FC<AddChooseProps> = ({ setTeamPage, isHovering }) => {
  const [teammates, setTeammateData] = useState<number[]>([]);
  const [serach, setSearch] = useState("");

  const createTeamWithChoosing = useCreateTeamWithChoosingMutation();

  const { electionId } = useElectionContext();
  const useGetTeamWithChoosing = useGetTeamWithChoosingQuery({
    page: 1,
    election: electionId,
    query: serach,
  });

  const handleOnChoose = (
    e: ChangeEvent<HTMLInputElement>,
    data: ChooseItemProps["item"]
  ) => {
    if (e?.target?.checked) {
      setTeammateData([...teammates, data?.id]);
    } else {
      setTeammateData(teammates.filter((item) => item !== data.id));
    }
  };

  const handleAddTeammate = () => {
    const chooseTeamMates = createTeamWithChoosing.mutateAsync({
      election: electionId,
      teammates,
    });
    chooseTeamMates
      .then((res) => {
        toast.success("Teammates added successfully");
        setTeamPage("team");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="addchoose">
      <div className="addchoose__top">
        <h2>Add teammate</h2>
        <img
          onClick={() => {
            setTeamPage("team");
            setSearch("");
          }}
          src={closeIcon}
          alt="close-icon"
        />
      </div>
      <div className="addchoose__input">
        <Input
          icon={<SearchIcon />}
          variant="filled"
          placeholder="Search"
          radius="lg"
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <Button onClick={handleAddTeammate}>Add</Button>
      </div>
      <div
        className={`${
          isHovering ? "addchoose__list" : "addchoose__list-hover"
        }`}
      >
        {useGetTeamWithChoosing?.data?.results.map(
          (item: any, index: number) => {
            return (
              <ChooseItem
                handleOnChoose={handleOnChoose}
                item={item}
                key={index}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default AddChoose;
