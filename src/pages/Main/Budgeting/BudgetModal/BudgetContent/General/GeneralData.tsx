import "./style.css";
import React, {useState} from "react";
import arrowblue from "../../../../../../assets/images/arrowblue.svg";
import arrowred from "../../../../../../assets/images/arrowred.svg";
import {formatDate} from "utils/helpers/format-date";
import GeneralDetail from "./Detail/GeneralDetail";

type GeneralDataProps = {
    item: any;
    setChange?: any
};
const GeneralData: React.FC<GeneralDataProps> = ({item, setChange}) => {
    const [transactionId, setTransactionId] = useState(null);
    const [modal, setModal] = useState(false);
    const [year, month, day] = formatDate(item.date);
    let objDate = new Date(item.date).toLocaleString("en-us", {
        month: "short",
    });
    return (
        <div className="generaldata">
            <div className="generaldata__table">
                <div style={{display: "flex"}}>
                    <div className="generaldata__table-day">
                        <p>{day < 9 ? `0${day}` : day}</p>
                        <p>{objDate}</p>
                    </div>
                    {item.transactions?.map((i: any) => (
                        <div
                            key={i.id}
                            className="generaldata__table-info"
                            onClick={() => {
                                setModal(true);
                                setTransactionId(i.id);
                            }}
                        >
                            <img
                                src={i.transaction_type === "income" ? arrowblue : arrowred}
                                alt={item.reason}
                            />
                            <div className="generaldata__wrapper">
                                <p className="general__data-title"> {i.reason}</p>
                                <p className="general__data-budget">${i.amount}</p>
                            </div>
                            <p className="general__data-time"> {i.data}</p>
                        </div>
                    ))}
                </div>
            </div>
            <GeneralDetail setChange={setChange} opened={modal} setOpened={setModal} transactionId={transactionId}
                           setTransactionId={setTransactionId}/>
        </div>
    );
};

export default GeneralData;
