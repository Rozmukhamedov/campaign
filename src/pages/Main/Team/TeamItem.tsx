import { Checkbox } from "@mantine/core";
import React, { ChangeEvent } from "react";
import IMG from "assets/images/default_user.png";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

type TeamItemProps = {
  item: any;
  checkDelete?: boolean;
  setOpenGrid: any;
  handleChangeTick: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
};
const TeamItem: React.FC<TeamItemProps> = ({
  item,
  checkDelete,
  setOpenGrid,
  handleChangeTick,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpenTeamDetails = (id: number) => {
    navigate({
      pathname,
      search: createSearchParams({
        teamId: id.toString(),
      }).toString(),
    });
    setOpenGrid("team_detail");
  };

  return (
    <div className="teamitem__wrapper">
      <div
        className="teamitem__left-info"
        onClick={() => setOpenGrid("team_detail")}
      >
        <img src={!!item.image ? item.image : IMG} alt={item.first_name} />
        <div
          className="team__fullname-info"
          onClick={() => handleOpenTeamDetails(item?.id)}
        >
          <p className="teamitem__name">
            {item.first_name} {item.last_name}
          </p>
          {/*<p className="teamitem__job">{item.email}</p>*/}
        </div>
      </div>
      <div className="teamitem__right-info">
        <div>
          <p>{item.phone_number}</p>
          <p>{item.email}</p>
        </div>
        {checkDelete && (
          <div className="teamitem__checkbox">
            <Checkbox
              onChange={(event) => handleChangeTick(event, item?.id)}
              color="red"
              size="md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamItem;
