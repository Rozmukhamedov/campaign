import qs from "qs";
import React from "react";
import { useState } from "react";
import Button from "components/Button";
import { useEffect, useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { useEventsCompletelyDeleted } from "hooks/mutation/useEventsCompletelyDeleted";
import { queryClient } from "services/accountAPI";

type modalItemProps = {
  item?: any;
  refetchEvent?: any;
  eventList?: any;
};

const ModalItem: React.FC<modalItemProps> = ({
  item,
  refetchEvent,
  eventList,
}) => {
  const [openseting, setOpenSeting] = useState(false);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const menuRef: any = useRef();
  const useDeleteEvent = useEventsCompletelyDeleted();

  const handleEventItem = (id: number) => {
    navigate({
      pathname,
      search: qs.stringify({
        ...query,
        event_id: id,
      }),
    });
    setOpenSeting(!openseting);
  };
  const handleDeleteEvent = (event: any, id: number) => {
    event.stopPropagation();

    const deleteEvent = useDeleteEvent.mutateAsync({ id });
    deleteEvent
      .then((res) => {
        refetchEvent();
        queryClient.refetchQueries("use-get-all-event-query");
        navigate({
          pathname,
          search: createSearchParams({
            event_id: eventList[0]?.id === id ? eventList[1]?.id?.toString() : eventList[0]?.id?.toString(),
          }).toString(),
        });
       
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenSeting(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      if (openseting) {
        setOpenSeting(false);
      }
    };
  });
  useEffect(() => {
    let handlerkokage = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenSeting(false);
      }
    };

    document.addEventListener("mousedown", handlerkokage);

    return () => {
      document.removeEventListener("mousedown", handlerkokage);
      if (openseting) {
        setOpenSeting(false);
      }
    };
  });
  return (
    <div>
      <ul ref={menuRef}>
        <li
          className="each_event_item"
          onClick={() => handleEventItem(item?.id)}
        >
          <div>{item?.title}</div>
          <Button
            onClick={(e: any) => handleDeleteEvent(e, item?.id)}
            className="each_event_item_delete_icon"
          >
            <RiDeleteBinLine />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ModalItem;
