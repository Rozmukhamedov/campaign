import "./style.css";
import { useEffect, useState } from "react";
import ModaAddGuest from "./ModalAdd/ModaAddGuest";
import ModalContentItem from "./ModalContentItem/ModalContentItem";
import {
  useGetEventGuests,
  useGetTeamQuery,
  useVotersQuery,
} from "hooks/query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useGetEventById } from "hooks/query/useGetEventById";
import qs from "qs";
import { useElectionContext } from "context/ElectionContext";
import { useGetTeamPersonsList } from "hooks/query/useGetTeamPersonsList";
import { useTeamPersonsListAddingEvent } from "hooks/query/useTeamPersonsListAddingEvent";
import useDebounce from "../../../../../hooks/custom/useDebounce";
// import Button from "components/Button/Button";

const ModalContent = () => {
  const [opened, setOpened] = useState("");
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("event_id");
  const eventById = useGetEventById(Number(eventId));
  const { electionId } = useElectionContext();
  const eventData = eventById?.data;
  const date = new Date(eventData?.time);
  const eventDate = eventData?.time?.split(" ")?.[0];
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const votersList = useVotersQuery({
    query: debouncedValue,
    election: electionId,
  });

  const handleSearchInput = (e: any) => {
    setValue(e?.target?.value);
  };

  const guestsList = useGetEventGuests({ page: 1, event: Number(eventId) });
  const teamList = useGetTeamPersonsList({ event: eventId });
  const useTeamPersonsListEvent = useTeamPersonsListAddingEvent({
    electionId: electionId,
    page: 1,
    event: eventId,
  });

  useEffect(() => {
    guestsList.refetch();
    teamList.refetch();
    useTeamPersonsListEvent.refetch();
  }, [opened]);

  return (
    <div className="modalcontent__wrapper">
      <div className="modalcontent__top">
        <h2>{eventData?.title}</h2>
        <div className="modalcontent__locdate">
          {eventDate && (
            <div className="modalcontent__date">
              <p>
                <span>
                  {hours}:{minutes}
                </span>
              </p>
              <p>{eventDate}</p>
            </div>
          )}

          <div className="modalcontent__adress">
            <p>{eventData?.address}</p>
          </div>
        </div>
      </div>
      {eventData?.text && <hr className="hr" />}
      {eventData?.text && (
        <div className="modalcontent__info">
          <h3>Description</h3>
          <p>{eventData?.text}</p>
        </div>
      )}
      <div className="modalcontent__info-item">
        <ModalContentItem
          item={guestsList}
          title={"Guests"}
          opened={opened}
          setOpened={setOpened}
        />
        <ModalContentItem
          item={teamList}
          title={"Team"}
          opened={opened}
          setOpened={setOpened}
        />
      </div>
      <ModaAddGuest
        handleSearchInput={handleSearchInput}
        data={opened === "Team" ? useTeamPersonsListEvent : votersList}
        opened={opened}
        setOpened={setOpened}
        guestsList={guestsList}
      />
    </div>
  );
};

export default ModalContent;
