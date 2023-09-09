import "./style.css";
import { useState } from "react";
import BudgetingItem from "./BudgetingItem";
import BudgetModal from "./BudgetModal/BudgetModal";
import { useElectionContext } from "context/ElectionContext";
import { useGetBalanceQuery, useGetTransactionsQuery } from "hooks/query";

function Budgeting() {
  const [opened, setOpened] = useState(false);
  const { electionId } = useElectionContext();
  const useGetBalance = useGetBalanceQuery({
    page: 1,
    election: electionId,
  });

  const useGetTransactions = useGetTransactionsQuery({
    election: electionId,
    page: 1,
    enabled: !opened,
    dailiy: "true",
  });

  return (
    <>
      <div className="budgeting" onClick={() => setOpened(true)}>
        <h2>Budget</h2>
        <div className="budgeting__balnce">
          <p>Budget</p>
          <h3>
            $
            {useGetBalance.data?.results.length > 0
              ? useGetBalance.data?.results[0]?.balance
              : 0}
          </h3>
        </div>
        <div className="budgeting__list">
          <div className="budgeting__info">
            {useGetTransactions.data?.map(
              (item: any, index: number) => (
                <BudgetingItem item={item} key={index} />
              )
            )}
          </div>
        </div>
      </div>{" "}
      <BudgetModal
        opened={opened}
        setOpened={setOpened}
        balance={useGetBalance}
      />
    </>
  );
}

export default Budgeting;
