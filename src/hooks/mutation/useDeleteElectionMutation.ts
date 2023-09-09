import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteElectionMutation = () => {
    return useMutation((id: any) => request.delete(`/election/delete/${id}/`));
};
