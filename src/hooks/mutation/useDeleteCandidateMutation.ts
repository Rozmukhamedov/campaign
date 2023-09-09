import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteCandidateMutation = () => {
    return useMutation((id: number) => request.delete(`/candidates/${id}/`));
};
