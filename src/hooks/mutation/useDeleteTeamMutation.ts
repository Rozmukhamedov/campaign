import {useMutation} from "react-query";
import {request} from "services/api";

export const useDeleteTeamMutation = () => {
    return useMutation((data: { id: number[] }) => request.patch(`/team/delete/`, data));
};
