import "./style.css";
import ModalItem from "./ModalItem";
import { useEffect, useState } from "react";
import AddEventModal from "./AddEventModal";
import logo from "assets/images/logoblack.svg";
import { useElectionContext } from "context/ElectionContext";
import { useEventModalContext } from "context/OpenEventModal";
import { useElectionEventQuery } from "hooks/query/useElectionEventQuery";

const ModalMenu = () => {
  const [opened, setOpened] = useState(false);
  const { electionId } = useElectionContext();
  const electionEvent = useElectionEventQuery(electionId);
  const { setOpen } = useEventModalContext();

  // useEffect(() => {
  //     navigate({
  //         pathname,
  //         search: createSearchParams({
  //             event_id: electionEvent?.data?.[0]?.id?.toString()
  //         }).toString()
  //     })
  // }, [electionEvent.isSuccess])

  useEffect(() => {
    electionEvent.refetch();
  }, [opened]);

  return (
    <div className="modalmenu__wrapper">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="event__modal-item">
        {electionEvent?.data?.map((item: any, index: number) => {
          return (
            <ModalItem
              item={item}
              refetchEvent={electionEvent.refetch}
              key={index}
              eventList={electionEvent?.data}
            />
          );
        })}
      </div>
      <div className="event__modal-btn">
        <button onClick={() => setOpen(true)}>
          <span>+</span> Add event
        </button>
      </div>
      <AddEventModal opened={opened} setOpened={setOpened} />
    </div>
  );
};

export default ModalMenu;
