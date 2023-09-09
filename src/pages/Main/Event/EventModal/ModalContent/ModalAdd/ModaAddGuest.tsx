import qs from "qs";
import "./style.css";
import toast from "react-hot-toast";
import Button from "components/Button";
import ModalAddItem from "./ModalAddItem";
import { Input, Modal } from "@mantine/core";
import { useLocation } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import closeIcon from "assets/images/closeicon.svg";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import {
  useElectionGuestCreate,
  useTeamAddPersonEventTeam,
} from "hooks/mutation";

type ModaladdGProps = {
  data?: any;
  opened: string;
  setOpened?: any;
  handleSearchInput?: any;
  guestsList?: any;
};

const ModaAddGuest: React.FC<ModaladdGProps> = ({
  data,
  opened,
  handleSearchInput,
  setOpened,
  guestsList,
}) => {
  const { search } = useLocation();
  const { event_id } = qs.parse(search, { ignoreQueryPrefix: true });
  const [guests, setGuests] = useState([]);
  const useElectionGuests = useElectionGuestCreate();
  const useAddTeam = useTeamAddPersonEventTeam();

  const handleAddEventGuest = (e: FormEvent<HTMLFormElement>) => {
    if (opened === "Guests") {
      const data = {
        event_id,
        guests,
      };

      const electionGuests = useElectionGuests.mutateAsync({ data });
      return electionGuests
        .then((res) => {
          toast.success("Guest successfully added");
          setOpened("");
          setGuests([]);
          guestsList.refetch();
        })
        .catch((err) => {
          toast.error("Please check fields");
        });
    } else {
      const data = {
        event_id,
        team_members: guests,
      };
      const teamData = useAddTeam.mutateAsync({ data });
      return teamData
        .then((res) => {
          toast.success("Team successfully added");
          setOpened("");
          setGuests([]);
        })
        .catch((err) => {
          toast.error("Please check fields");
        });
    }
  };

  return (
    <Modal opened={!!opened} onClose={() => setOpened(false)}>
      <div className="modaladd__wrapper">
        <div className="modaladd__top">
          <h2>Add {opened}</h2>
          <div>
            <img src={closeIcon} onClick={() => setOpened(false)} />
          </div>
        </div>
        <div className="modaladd__form">
          <div className="modaladd_form-input">
            <Input
              icon={<SearchIcon />}
              variant="filled"
              onChange={handleSearchInput}
              placeholder="Search"
              radius="lg"
            />
          </div>
          <Button className="modaladd_btn-add" onClick={handleAddEventGuest}>
            Add
          </Button>
        </div>
        <div className="modaladd__users">
          {data?.data?.results?.map((item: any, index: number) => (
            <ModalAddItem
              setGuests={setGuests}
              guests={guests}
              item={item}
              key={index}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModaAddGuest;
