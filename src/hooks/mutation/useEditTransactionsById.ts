import {useMutation} from "react-query";
import {request} from "services/api";

export const useEditTransactionsById = () => {
    return useMutation(({data, id}: any) =>
        request.patch(`/election/transactions/update/${id}`, data)
    );
};
