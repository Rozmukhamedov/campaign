import "./style.css";
import {useState, FC} from "react";
import GeneralItem from "./GeneralItem";
import GeneralData from "./GeneralData";
import ModalAddExp from "./AddExp-Modal/ModalAddExp";
import ModalAddInc from "./AddInc-Modal/ModalAddInc";
import {useGetTransactionsQuery} from "hooks/query";
import {useElectionContext} from "context/ElectionContext";

type GeneralProps = {
    balance?: any;
    openedModel: any;
};

const General: FC<GeneralProps> = ({balance, openedModel}) => {
    const [transaction, setTransaction] = useState("");
    const [opened, setOpened] = useState(false);
    const [change, setChange] = useState<{ open_type: string, id?: number }>({open_type: ""});
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState("");
    const [page, setPage] = useState(1);
    const {electionId} = useElectionContext();

    const useGetTransactions = useGetTransactionsQuery({
        election: electionId,
        page: page,
        type_transaction: transaction,
        month: month,
        year: year,
        enabled: openedModel === "general"
    });

    return (
        <>
            <div className="general__wrapper">
                <div className="general__top">
                    <h2>General</h2>
                    <div className="general__info-badge">
                        <p>Your balance</p>
                        <h3>${balance.data?.results.length > 0 ? balance.data?.results[0]?.balance : 0}</h3>
                    </div>
                </div>
                <div className="general__exp-btns">
                    <p>Expense and Income</p>
                    <div>
                        <button
                            onClick={() => {
                                setOpened(true);
                                setChange({open_type: "modaladdexp"});
                            }}
                            className="general__add-exp"
                        >
                            Add Expense
                        </button>
                        <button
                            onClick={() => {
                                setOpened(true);
                                setChange({open_type: "modaladdinc"});
                            }}
                            className="general__btn-inc"
                        >
                            Add Income{" "}
                        </button>
                    </div>
                </div>
                <GeneralItem
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                    transaction={transaction}
                    setTransaction={setTransaction}
                />
                {useGetTransactions?.data?.map((item: any, index: number) => (
                    <GeneralData setChange={setChange} item={item} key={index}/>
                ))}

                {change?.open_type === "modaladdexp" ? (
                    <ModalAddExp
                        opened={opened}
                        setOpened={setOpened}
                        useGetTransactions={useGetTransactions}
                        balance={balance}
                    />
                ) : change?.open_type === "modaladdinc" ? (
                    <ModalAddInc
                        change={change}
                        setChange={setChange}
                        useGetTransactions={useGetTransactions}
                        balance={balance}
                    />
                ) : null}
            </div>
        </>
    );
};

export default General;
