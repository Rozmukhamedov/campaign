import React from "react";
import "./style.css";
import { RiCloseCircleFill } from "react-icons/ri";

type TeamAddModalProps = {
  setChangeTeam: any;
  setOpenModal: boolean | any;
  setTeamPage: any;
};
const TeamAddModal: React.FC<TeamAddModalProps> = ({
  setChangeTeam,
  setOpenModal,
  setTeamPage,
}) => {
  return (
    <div className="teamaddmodal">
      <div className="teamaddmodal__close">
        <i onClick={() => setOpenModal(false)}>
          <RiCloseCircleFill size={34} />
        </i>
      </div>
      <div
        className="teamaddmodal__choose"
        onClick={() => {
          setTeamPage("addchoosevoter");
          setOpenModal(false);
        }}
      >
        <h4>Choose</h4>
        <p>from the voting</p>
      </div>
      <div
        className="teamaddmodal__addteam"
        onClick={() => setChangeTeam("addteam")}
      >
        <h4>Add</h4>
        <p>new team-mate</p>
      </div>
    </div>
  );
};

export default TeamAddModal;
