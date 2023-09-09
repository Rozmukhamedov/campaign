import React from "react";

type GeneralItemProps = {
    year: any;
    setYear: any;
    month: string;
    setMonth: any;
    transaction: string;
    setTransaction: any;
};

const GeneralItem: React.FC<GeneralItemProps> = ({
                                                     year,
                                                     setYear,
                                                     month,
                                                     setMonth,
                                                     transaction,
                                                     setTransaction,
                                                 }) => {
    const years = [
        {
            year: 2020,
        },
        {
            year: 2021,
        },
        {
            year: 2022,
        },
    ];
    const months = [
        {
            month: "January",
            key: "1",
        },
        {
            month: "February",
            key: "2",
        },
        {
            month: "March",
            key: "3",
        },
        {
            month: "April",
            key: "4",
        },
        {
            month: "May",
            key: "5",
        },
        {
            month: "June",
            key: "5",
        },
        {
            month: "July",
            key: "7",
        },
        {
            month: "August",
            key: "8",
        },
        {
            month: "September",
            key: "9",
        },
        {
            month: "October",
            key: "10",
        },
        {
            month: "November",
            key: "11",
        },
        {
            month: "December",
            key: "12",
        },

    ];
    const handleFilterClear = () => {
        setMonth("");
        setYear(null);
        setTransaction("")
    }

    return (
        <div className="generalitem__wrapper">
            <div className="general__date-info">
                <div className="general__year">
                    {years.map((y: any, i: number) => (
                        <button
                            className={`${year == y.year ? "active" : null}`}
                            key={i}
                            onClick={() => setYear(y.year)}
                        >
                            {y.year}
                        </button>
                    ))}
                </div>
                <hr className="hr__general"/>
                <div className="general__month">
                    {months.map((m: any, i: number) => (
                        <button
                            className={`${month === m.key ? "active" : null}`}
                            key={i}
                            onClick={() => setMonth(m.key)}
                        >
                            {m.month}
                        </button>
                    ))}
                </div>
                <hr className="hr__general"/>
                <div className="general__expi">
                    <div>
                        <button
                            style={{marginRight: 10}}
                            className={`${transaction == "expense" ? "active" : null}`}
                            onClick={() => setTransaction("expense")}
                        >
                            Expense
                        </button>
                        <button
                            className={`${transaction == "income" ? "active" : null}`}
                            onClick={() => setTransaction("income")}
                        >
                            Income
                        </button>
                    </div>
                    <button
                        onClick={handleFilterClear}
                        style={{width: "inherit"}}
                    >
                        Clear filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneralItem;
