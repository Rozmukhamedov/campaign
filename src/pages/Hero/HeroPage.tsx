import "./styless.css";
import { useNavigate } from "react-router-dom";
import { useGetElectionQuery } from "hooks/query";
import React, { useEffect, useState } from "react";
import { motion, useIsPresent } from "framer-motion";
import { getStorage } from "utils/helpers/local-storage";
import { ReactComponent as IconArrow } from "assets/images/icon-arrow.svg";

const HeroPage = () => {
  const [mainUser, setMainUser] = useState(
    JSON.parse(getStorage("user") || "{}") || {}
  );

  const navigate = useNavigate();
  const electionList = useGetElectionQuery({ page: 1 });
  const election_id = electionList?.data?.results?.[0]?.id;
  
  const isPresent = useIsPresent();
  const handleNavigateMain = () => {
    election_id && localStorage.setItem("election_id", election_id);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    return () => {
      election_id && localStorage.setItem("election_id", election_id);
    };
  }, []);

  return (
    <motion.div
      exit={{ zIndex: 1000, y: "-100%", transition: { duration: 0.5 } }}
      className="hero_wrapper"
    >
      <h3>
        Hello {mainUser?.first_name}! <br /> This is your path to success
      </h3>
      <h1>
        You are here <br />
        to win! 🔥
      </h1>
      <div className="icon__arrow">
        <div style={{ cursor: "pointer" }} onClick={handleNavigateMain}>
          <IconArrow />
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    </motion.div>
  );
};

export default HeroPage;
