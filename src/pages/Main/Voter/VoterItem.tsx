import "./style.css";
import React from "react";
import { Checkbox } from "@mantine/core";
import IMG from "assets/images/default_user.png";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

type VoterItemProps = {
  item: {
    election: number;
    first_name: string;
    id: number;
    image: any;
    invite_people: number;
    last_name: string;
    organization: string;
    status: string;
    social_contacts: any;
    colour?: string;
    continent?: string
    country?: string
  };
  setOpenGrid: any;
  showDelete: boolean;
  deleteVoters: any;
};

const VoterItem: React.FC<VoterItemProps> = ({
  item,
  setOpenGrid,
  showDelete,
  deleteVoters,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleOpenVoterDetails = (id: number) => {
    navigate({
      pathname,
      search: createSearchParams({
        voterId: id.toString(),
      }).toString(),
    });
    setOpenGrid("voterdetails");
  };

  return (
    <div className="vooter__wrapper">
      <div className="vooter__list">
        {/* <div className="vooter__change">
          <h3>{item.change}</h3>
          <span
            className="vooter__border"
            style={{ background: `${item.bgcolor}` }}
          ></span>
        </div> */}
        <div className="vooter__info">
          <div
            className="vooter__info-left"
            onClick={() => handleOpenVoterDetails(item?.id)}
          >
            <div>
              <div
                style={{ borderColor: item?.colour }}
                className="outline_colored_image"
              >
                <img src={!!item.image ? item.image : IMG} />
              </div>
            </div>
            <div className="voter_info_container">
              <div className="vooter__name">
                <h4>
                  {item.first_name ? item.first_name : "Name"} {" "}
                  {item.last_name ? item.last_name : null}
                </h4>
              </div>
              <div className="vooter__job">
                <p>{item?.country ? item.country : "Country"}</p>
              </div>
            </div>
          </div>
          <div
            className="vooter__info-center"
            onClick={() => handleOpenVoterDetails(item?.id)}
          >
            <p className="phone">{item?.social_contacts?.phone_number}</p>
            <p className="mail">{item?.social_contacts?.email}</p>
          </div>
          <div className="vooter__info-right">
            {showDelete ? (
              <Checkbox
                radius="md"
                size="md"
                onClick={() => deleteVoters(item?.id)}
              />
            ) : (
              <p>{item?.invite_people ? item?.invite_people : 0}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterItem;
