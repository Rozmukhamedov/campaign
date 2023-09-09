import "./styless.css";
import { FC } from "react";
import UsersItem from "./UsersItem";
import { Accordion } from "@mantine/core";
import Logo from "assets/images/logoblack.svg";
import Logout from "../../../assets/images/log-out.svg";
import { removeCookie } from "../../../utils/cookie";
import { useGetAccountQuery } from "hooks/query/useGetAccountQuery";

type ProfileSideBarProps = {
  setView?: any;
  setOnChangeMail: any;
  opened: any;
  setElectionId: any
};

const ProfileSideBarComponent: FC<ProfileSideBarProps> = ({
  setView,
  setOnChangeMail,
  opened,
  setElectionId,
}) => {
  const userInfo = useGetAccountQuery({ page: 1, enabled: opened });

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("user");
    window.location.reload();
  };
  return (
    <section className="sidebar__wrapper">
      <Accordion>
        <div className="Profile__sidebar-left">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="scrdiv">
            <UsersItem
              setView={setView}
              setOnChangeMail={setOnChangeMail}
              userInfo={userInfo?.data}
              setElectionId={setElectionId}
            />
            <div className="add__user">
              <button className="add__btn" onClick={() => setView("create")}>
                <span>+</span> Add election
              </button>
            </div>
          </div>
          <div className="sidebar__lang">
            <p>Language</p>
            {/* <p>Trash</p> */}
          </div>
          <div onClick={handleLogout} className="logout">
            <img src={Logout} alt="logut" />
            logout
          </div>
        </div>
      </Accordion>
    </section>
  );
};

export default ProfileSideBarComponent;
