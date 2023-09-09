import React from "react";
import "./style.css";
import Image from "assets/images/logoelect.png";
import { useNavigate } from "react-router-dom";

function ElectionCard({ item }: any) {
  const navigate = useNavigate();
  const electionClick = (id: any) => {
    localStorage.setItem("election_id", String(item.id));
    localStorage.setItem("election_title", String(item.title))
    document.location.pathname = "/hero"
  };
  return (
    <div className="election__card" onClick={() => electionClick(item)}>
      <img src={Image} alt="" />
      <p>{item.title}</p>
    </div>
  );
}

export default ElectionCard;
