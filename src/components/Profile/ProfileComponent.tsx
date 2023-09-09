import "./styless.css";
import React, { useState } from "react";
import CustomModal from "components/Modal/Modal";
import { useGetElectionQuery } from "hooks/query";
import { useAccountPopup } from "context/AccountPopupContext";
import ViewAccountComponent from "./Account/ViewAccountComponent";
import ProfileSideBarComponent from "./Sidebar/ProfileSideBarComponent";
import CreateElectionComponent from "./CreateElection/CreateElectionComponent";
import EditElectionComponent from "./EditElection/EditElectionComponent";

const ProfileComponent = () => {
  const { opened, setOpened } = useAccountPopup();
  const [view, setView] = useState("account");
  const [onChangeMail, setOnChangeMail] = useState("");
  const [electionId, setElectionId] = useState(null)
  return (
    <>
      <CustomModal opened={opened} onClose={() => setOpened(false)} size="80%">
        <div className="inner__sidebar">
          <ProfileSideBarComponent
            setView={setView}
            setOnChangeMail={setOnChangeMail}
            opened={opened}
            setElectionId={setElectionId}
          />
          <div className="rightsidebar__wrapper">
            {view == "account" ? (
              <ViewAccountComponent
                onChangeMail={onChangeMail}
                setOnChangeMail={setOnChangeMail}
                view={view}
                setOpened={setOpened}
              />
            ) : null}
            {view == "create" ? (
              <CreateElectionComponent setView={setView}/>
            ) : null}
            {view == "edit" ? (
              <EditElectionComponent id={electionId} setView={setView}/>
            ) : null}
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default ProfileComponent;
