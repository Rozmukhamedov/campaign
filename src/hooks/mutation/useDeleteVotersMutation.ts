import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteVotersMutation = () => {
    return useMutation((data: any) => request.patch(`/voters/delete_voters/`, data));
};
