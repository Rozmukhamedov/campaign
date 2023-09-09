import "./style.css";
import { motion } from "framer-motion";
import { Avatar } from "@mantine/core";
import { getCookie } from "utils/cookie";
import { useLocation } from "react-router-dom";
import IMG from "assets/images/default_user.png";
import { useGetElectionQuery } from "hooks/query";
import LogoBlack from "assets/images/logoblack.svg";
import { useState, useEffect, useRef } from "react";
import DropdonHeader from "./Dropdown/DropdonHeader";
import HokageDropdown from "./HokageDropdown/HokageDropdown";
import ProfileComponent from "components/Profile/ProfileComponent";
import { useGetAccountQuery } from "hooks/query/useGetAccountQuery";

function Header() {
  const [open, setOpen] = useState(false);
  const [hokageOpen, setHokageOpen] = useState(false);
  const [electionState, setElectionState] = useState(
    localStorage.getItem("election_title")
      ? localStorage.getItem("election_title")
      : "No Election"
  );

  const isAuth = !!getCookie("token");
  const location = useLocation();
  const path = location.pathname === "/";
  const authLogin = location.pathname === "/hero";
  let menuRef: any = useRef();

  const electionList = useGetElectionQuery({ page: 1, enabled: isAuth });
  const userInfo = useGetAccountQuery({ page: 1, enabled: isAuth });

  useEffect(() => {
    setElectionState(localStorage.getItem("election_title"));
  }, [localStorage.getItem("election_title")]);

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      if (hokageOpen) {
        setHokageOpen(false);
      }
    };
  });
  useEffect(() => {
    let handlerkokage = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        setHokageOpen(false);
      }
    };

    document.addEventListener("mousedown", handlerkokage);
    return () => {
      document.removeEventListener("mousedown", handlerkokage);
      if (open) {
        setOpen(false);
      }
    };
  }, []);

  return (
    <>
      <motion.div
        className="header"
        style={{ backgroundColor: path ? "#F5F5F5" : "none" }}
      >
        <div className="header__wrapper">
          <div className="logo">
            {path ? <img src={LogoBlack} alt="My Campaign" /> : <></>}
          </div>
          {path || authLogin ? (
            <>
              <div className="right__menu" ref={menuRef}>
                <div className="menu-trigger">
                  <div
                    className="div"
                    onClick={() => {
                      setHokageOpen(!hokageOpen);
                    }}
                  >
                    <h3 style={{ color: path ? "#313131" : "#fff" }}>
                      {electionState}
                    </h3>
                    <div
                      className={`hokage__dropdown ${
                        hokageOpen ? "hokage__active" : "hokage__inactive"
                      }`}
                    >
                      <HokageDropdown
                        list={electionList.data?.results}
                        changeTitle={setElectionState}
                      />
                    </div>
                  </div>
                  <div style={{ color: path ? "#313131" : "#fff" }}>|</div>
                  <p style={{ color: path ? "#313131" : "#fff" }}>
                    {userInfo.data?.first_name} <br />{" "}
                    {userInfo.data?.last_name}
                  </p>
                  <Avatar
                    onClick={() => {
                      setOpen(!open);
                    }}
                    radius="xl"
                    size="lg"
                    src={
                      !!userInfo.data?.image
                        ? `${userInfo?.data?.image}`
                        : IMG
                    }
                  />
                </div>
              </div>
              <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
                <DropdonHeader mainUser={userInfo?.data} />
              </div>
            </>
          ) : null}
        </div>
      </motion.div>

      <ProfileComponent />
    </>
  );
}

export default Header;
