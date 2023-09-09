import "./style.css"
import React from "react";
import redicon from "../../../assets/images/arrowred.svg";
import blueicon from "../../../assets/images/arrowblue.svg";

type BudgetItemProps = {
  item: any;
};

const BudgetingItem: React.FC<BudgetItemProps> = ({ item }) => {

  return (
    <div className="generaldata__table-item">
      <img
        src={item.transaction_type === "income" ? blueicon : redicon}
        alt={item.reason}
      />
      <div className="generaldata__wrapper">
        <p className="general__data-title"> {item.reason}</p>
        <p className="general__data-budget">${item.amount}</p>
      </div>
      <p className="general__data-time"> {item.custom_date}</p>
    </div>
  );
};

export default BudgetingItem;
