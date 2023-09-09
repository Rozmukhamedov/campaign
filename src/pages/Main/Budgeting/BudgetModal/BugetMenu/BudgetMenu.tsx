import "./style.css";
import React from "react";
import logo from "../../../../../assets/images/logoblack.svg";

type BudgetMenuProps = {
  setBudgetChange: React.Dispatch<React.SetStateAction<string>>;
};

const BudgetMenu: React.FC<BudgetMenuProps> = ({ setBudgetChange }) => {
  return (
    <div className="budget__menu-wrapper">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <li onClick={() => setBudgetChange("general")}>General</li>
        <li onClick={() => setBudgetChange("sponsors")}>Sponsors</li>
        <li onClick={() => setBudgetChange("reporties")}>Reporting</li>
      </ul>
    </div>
  );
};

export default BudgetMenu;
