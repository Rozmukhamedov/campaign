import "./style.css";
import React, { FC } from "react";
import General from "./General/General";
import Reporties from "./Reporties/Reporties";
import Sponsors from "./Sponsors/Sponsors";

type BudgetContentProps = {
  budgetPage: string;
  balance?: any;
};

const BudgetContent: FC<BudgetContentProps> = ({ budgetPage, balance }) => {
  return (
    <div className="budget__content">
      {budgetPage == "general" ? (
        <General balance={balance} openedModel={budgetPage} />
      ) : budgetPage == "sponsors" ? (
        <Sponsors openedModel={budgetPage} />
      ) : budgetPage == "reporties" ? (
        <Reporties />
      ) : null}
      {/* <ModalAddExp/> */}
    </div>
  );
};

export default BudgetContent;
