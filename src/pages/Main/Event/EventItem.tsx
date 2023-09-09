import React, { SetStateAction, useState } from "react";

import "./style.css";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteEventMutation } from "../../../hooks/mutation/useDeleteEventMutation";
import toast from "react-hot-toast";
import qs from "qs";

type EventItemProps = {
  item?: any;
  opened?: boolean | number;
  setOpened?: any;
  refetch?: any;
};

const EventItem: FC<EventItemProps> = ({
  item,
  opened,
  setOpened,
  refetch,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(item?.is_deleted);
  const EventDeleteMutation = useDeleteEventMutation();

  const handleClickEvent = (data: any) => {
    setOpened(data?.id);
    navigate({
      pathname,
      search: qs.stringify({
        event_id: data?.id,
      }),
    });
  };

  const handleChange = (e: any, id: number) => {
    const deleteEvent = EventDeleteMutation.mutateAsync({ id: id });
    deleteEvent
      .then((res) => {
        refetch();
        if (res?.data?.success === "deleted") {
          toast.success("Event completed successfully");
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
    if (!checked) {
      return setChecked(e?.target?.checked);
    }
    setChecked(!checked);
  };

  return (
    <div className="item__wrapper">
      <div className="list__item">
        <div className="item__checkbox-title">
          <input
            onChange={(e) => handleChange(e, item?.id)}
            type="checkbox"
            checked={checked}
            // value={checked}
            className="event__checkbox"
          />

          <h3
            onClick={() => handleClickEvent(item)}
            className={`${checked ? "line" : ""}`}
          >
            {item?.title}
          </h3>
        </div>
        <p className={`${checked ? "line" : ""}`}>
          {item?.time?.split(" ")[0]}
        </p>
      </div>
    </div>
  );
};

export default EventItem;
