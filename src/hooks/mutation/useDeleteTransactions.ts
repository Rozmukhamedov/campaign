import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteTransactions = () => {
    return useMutation(({
                            data,
                            id
                        }: { data: any, id: number }) => request.patch(`/election/transactions/delete/${id}`, data));
};
