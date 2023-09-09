import "./style.css";
import React from "react";
import {Modal} from "@mantine/core";
import {useTransactionsDetail} from "hooks/query";
import Button from "components/Button";
import {TiEdit} from "react-icons/ti";
import {RiDeleteBin5Line} from "react-icons/ri";
import {useDeleteTransactions} from "hooks/mutation/useDeleteTransactions";
import {useElectionContext} from "context/ElectionContext";
import toast from "react-hot-toast";
import {queryClient} from "services/accountAPI";

function GeneralDetail({
                           opened,
                           setOpened,
                           transactionId,
                           setTransactionId,
                           setChange
                       }: any) {
    const {electionId} = useElectionContext()
    const transactionsDetail = useTransactionsDetail({
        id: transactionId,
        enabled: !!transactionId,
    });
    const deleteTransactions = useDeleteTransactions();
    const handleDeleteTransactions = (id: number) => {
        const deleteTransactionById = deleteTransactions.mutateAsync({data: {election: electionId, id}, id})
        deleteTransactionById.then((res) => {
            toast.success(res?.data?.success)
            queryClient.refetchQueries("use-get-transactions")
            setOpened(false);
        }).catch((err) => {
            toast.error(err?.response?.data?.error || "Error deleting transactions")
        })
    }
    const handleEditTransactions = (id: number) => {
        setChange({open_type: "modaladdinc", id})
    }

    return (
        <Modal
            opened={opened}
            onClose={() => {
                setOpened(false);
                setTransactionId(null);
            }}
            centered={true}
        >
            <div className="transaction_operations">
                <Button
                    onClick={() => handleEditTransactions(transactionId)}><TiEdit/></Button>
                <Button onClick={() => handleDeleteTransactions(transactionId)}><RiDeleteBin5Line/></Button>
            </div>
            {transactionsDetail?.data ? (
                <div className="general__detail">
                    <h4>{transactionsDetail?.data?.reason}</h4>
                    <h3
                        style={
                            transactionsDetail?.data?.transaction_type !== "income"
                                ? {color: "#F5415F"}
                                : {color: "#1c54fc"}
                        }
                    >
                        {transactionsDetail?.data?.transaction_type !== "income"
                            ? "-"
                            : "+"}{" "}
                        $ {transactionsDetail?.data?.amount}
                    </h3>
                    <h5>
                        {transactionsDetail?.data?.custom_date}
                    </h5>
                    <p>{transactionsDetail.data?.description}</p>
                </div>
            ) : <div className="general__detail"></div>}
        </Modal>
    );
}

export default GeneralDetail;
