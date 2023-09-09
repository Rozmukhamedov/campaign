import "./style.css";
import { Modal } from "@mantine/core";
import React, { useState } from "react";
import BudgetContent from "./BudgetContent/BudgetContent";
import BudgetMenu from "./BugetMenu/BudgetMenu";

type BudgetModal = {
  opened: boolean;
  setOpened: any;
  balance?: any;
};

const BudgetModal: React.FC<BudgetModal> = ({ opened, setOpened, balance }) => {
  const [budgetPage, setBudgetChange] = useState("general");
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} size="80%">
      <div className="budget__modal-wrapper">
        <BudgetMenu setBudgetChange={setBudgetChange} />
        <BudgetContent budgetPage={budgetPage} balance={balance} />
      </div>
    </Modal>
  );
};

export default BudgetModal;
